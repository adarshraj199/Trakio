import express from 'express';
import { createEmployee } from '../controllers/employeeController.js';
import { requireAuth } from '../middleware.js';

const router = express.Router();

router.post('/', requireAuth, createEmployee);

export default router;