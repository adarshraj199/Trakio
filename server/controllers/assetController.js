import Asset from '../models/Asset.js';
import Movements from '../models/Movements.js';

export const createAsset = async (req, res) => {
  try {
    const { name, category, quantity, price, supplier, purchaseDate, lowStockThreshold } = req.body;

    if (!name || !category || quantity === undefined || price === undefined || !supplier) {
      return res.status(400).json({ message: 'Name, category, quantity, price, and supplier are required.' });
    }

    if (Number(quantity) < 0 || Number(price) < 0) {
      return res.status(400).json({ message: 'Quantity and price cannot be negative.' });
    }

    const asset = await Asset.create({
      ownerId: req.user.ownerId,
      name: name.trim(),
      category,
      quantity: Number(quantity),
      lowStockThreshold: Number(lowStockThreshold || 10),
      price: Number(price),
      supplier: supplier.trim(),
      purchaseDate: purchaseDate || undefined,
      createdBy: req.user.userId,
    });

    await Movements.create({
      ownerId: req.user.ownerId,
      assetId: asset._id,
      type: 'created',
      quantity: Number(quantity),
      performedBy: req.user.userId,
      recipient: 'Warehouse',
      destination: 'Initial Stock',
      paymentStatus: 'n/a',
    });

    res.status(201).json({ message: 'Asset created successfully.', asset });
  } catch (error) {
    console.error('Asset creation error:', error);
    res.status(500).json({ message: 'Could not create asset.' });
  }
};

export const getAssets = async (req, res) => {
  try {
    const { status } = req.query;
    let assets = await Asset.find({ ownerId: req.user.ownerId })
      .populate('createdBy', 'name role')
      .sort({ updatedAt: -1 });

    if (status === 'low-stock') {
      assets = assets.filter(a => a.quantity > 0 && a.quantity <= (a.lowStockThreshold || 10));
    } else if (status === 'out-of-stock') {
      assets = assets.filter(a => a.quantity === 0);
    }

    res.json({ assets });
  } catch (error) {
    console.error('Fetch assets error:', error);
    res.status(500).json({ message: 'Could not fetch assets.' });
  }
};

export const dispatchAsset = async (req, res) => {
  try {
    const { quantity, recipient, destination, paymentStatus } = req.body;
    const qty = Number(quantity);

    if (!qty || qty <= 0 || !recipient) {
      return res.status(400).json({ message: 'Quantity and recipient are required.' });
    }

    const asset = await Asset.findOne({ _id: req.params.id, ownerId: req.user.ownerId });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found.' });
    }

    if (asset.quantity < qty) {
      return res.status(400).json({ message: `Not enough stock. Only ${asset.quantity} left.` });
    }

    asset.quantity -= qty;
    await asset.save();

    const movement = await Movements.create({
      ownerId: req.user.ownerId,
      assetId: asset._id,
      type: 'issued',
      quantity: qty,
      performedBy: req.user.userId,
      recipient: recipient.trim(),
      destination: destination?.trim() || 'Dispatched',
      paymentStatus: paymentStatus || 'unpaid',
    });

    const populatedMovement = await Movements.findById(movement._id).populate('performedBy', 'name role');

    res.json({
      message: 'Stock updated successfully.',
      currentQuantity: asset.quantity,
      movement: populatedMovement,
    });
  } catch (error) {
    console.error('Dispatch error:', error);
    res.status(500).json({ message: 'Error dispatching stock.' });
  }
};

export const getAssetMovements = async (req, res) => {
  try {
    const movements = await Movements.find({ 
      assetId: req.params.id, 
      ownerId: req.user.ownerId 
    })
      .populate('performedBy', 'name role')
      .sort({ createdAt: -1 });

    res.json({ movements });
  } catch (error) {
    console.error('Fetch movements error:', error);
    res.status(500).json({ message: 'Could not fetch asset history.' });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owners can delete assets.' });
    }

    const asset = await Asset.findOneAndDelete({ 
      _id: req.params.id, 
      ownerId: req.user.ownerId 
    });

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found.' });
    }

    await Movements.deleteMany({ assetId: req.params.id });

    res.json({ message: 'Asset deleted successfully.' });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({ message: 'Could not delete asset.' });
  }
};