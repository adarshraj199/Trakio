import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerOwner = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must have at least 8 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'An account already uses this email.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const owner = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: 'owner',
    });

    res.status(201).json({
      message: 'Owner account created.',
      user: { id: owner._id, name: owner.name, email: owner.email, role: owner.role },
    });
  } catch (error) {
    console.error('Owner registration error:', error);
    res.status(500).json({ message: 'Could not create owner account.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required.' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: `This account is registered as an ${user.role}.` });
    }

    const ownerId = user.role === 'owner' ? user._id.toString() : user.ownerId?.toString();
    const token = jwt.sign(
      { userId: user._id.toString(), ownerId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Could not log in.' });
  }
};