import express from 'express';
import SOSEvent from '../models/SOSEvent.js';

const router = express.Router();

// Create SOS event
router.post('/', async (req, res) => {
  const { userId, location, description } = req.body;
  try {
    const event = new SOSEvent({ userId, location, description });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List SOS events
router.get('/', async (req, res) => {
  try {
    const events = await SOSEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 