import express from 'express';
import { registerOwner, login } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register-owner', registerOwner);
router.post('/login', login);

export default router;