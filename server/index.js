import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './views/authRoutes.js';
import assetRoutes from './views/assetRoutes.js';
import employeeRoutes from './views/employeeRoutes.js';

const app = express();
const port = process.env.PORT || 8000;


if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing from .env');
}
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ message: 'Trakio API is working' }));
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/employees', employeeRoutes);



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Trakio API is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database not connected:', error.message);
  });

