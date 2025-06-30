import express from 'express';
import Violation from '../models/Violation.js';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create violation
router.post('/', authenticateJWT, authorizeRoles('cop', 'admin'), async (req, res) => {
  try {
    const violation = await Violation.create(req.body);
    res.status(201).json(violation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List violations
router.get('/', async (req, res) => {
  try {
    const violations = await Violation.find();
    res.json(violations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id);
    if (!violation) return res.status(404).json({ message: 'Not found' });
    res.json(violation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const violation = await Violation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!violation) return res.status(404).json({ message: 'Not found' });
    res.json(violation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const violation = await Violation.findByIdAndDelete(req.params.id);
    if (!violation) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Explain violation (AI integration)
router.post('/explain', async (req, res) => {
  const { type, description } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert in Indian traffic law. Explain the following violation in simple terms for a citizen.' },
        { role: 'user', content: `Type: ${type}. Description: ${description}` },
      ],
      max_tokens: 150,
    });
    res.json({ explanation: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'AI service error', details: err.message });
  }
});

// Upload evidence for a violation
router.post('/:id/evidence', authenticateJWT, authorizeRoles('cop', 'admin'), upload.single('evidence'), async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id);
    if (!violation) return res.status(404).json({ message: 'Not found' });
    violation.evidenceFile = req.file ? req.file.path : null;
    await violation.save();
    res.json(violation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 