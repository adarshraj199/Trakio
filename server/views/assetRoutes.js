import express from 'express';
import { createAsset, getAssets, dispatchAsset, getAssetMovements  , deleteAsset} from '../controllers/assetController.js';
import { requireAuth } from '../middleware.js';

const router = express.Router();

router.post('/', requireAuth, createAsset);
router.get('/', requireAuth, getAssets);
router.post('/:id/dispatch', requireAuth, dispatchAsset);
router.get('/:id/movements', requireAuth, getAssetMovements);
router.delete('/:id' , requireAuth , deleteAsset);

export default router;