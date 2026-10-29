import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const createEmployee = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owners can add warehouse workers.' });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const employee = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: 'employee',
      ownerId: req.user.userId,
    });

    res.status(201).json({
      message: 'Warehouse worker created successfully.',
      employee: { id: employee._id, name: employee.name, email: employee.email },
    });
  } catch (error) {
    console.error('Create worker error:', error);
    res.status(500).json({ message: 'Could not create employee account.' });
  }
};