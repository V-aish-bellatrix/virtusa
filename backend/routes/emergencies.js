import express from 'express';
import Emergency from '../models/Emergency.js';
import dotenv from 'dotenv';
import { upload } from '../middleware/upload.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
dotenv.config();

const router = express.Router();

// Create emergency
router.post('/', async (req, res) => {
  try {
    const emergency = new Emergency(req.body);
    await emergency.save();
    res.status(201).json(emergency);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'An unexpected error occurred on the server.' });
  }
});

// List emergencies
router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find();
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ message: 'Not found' });
    res.json(emergency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emergency) return res.status(404).json({ message: 'Not found' });
    res.json(emergency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndDelete(req.params.id);
    if (!emergency) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload evidence for an emergency
router.post('/:id/evidence', authenticateJWT, authorizeRoles('cop', 'admin'), upload.single('evidence'), async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ message: 'Not found' });
    emergency.evidenceFile = req.file ? req.file.path : null;
    await emergency.save();
    res.json(emergency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 