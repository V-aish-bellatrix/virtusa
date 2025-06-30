import express from 'express';
import Fine from '../models/Fine.js';
import dotenv from 'dotenv';
import QRCode from 'qrcode';
dotenv.config();

const router = express.Router();

// List fines
router.get('/', async (req, res) => {
  try {
    const fines = await Fine.find();
    res.json(fines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Pay fine
router.post('/:id/pay', async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id);
    if (!fine) return res.status(404).json({ message: 'Not found' });
    fine.status = 'paid';
    fine.paidAt = new Date();
    await fine.save();
    res.json(fine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payment QR
router.get('/:id/qr', async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id);
    if (!fine) return res.status(404).json({ message: 'Not found' });
    const qrData = `Pay fine ID: ${fine.id}, Amount: ${fine.amount}`;
    const qr = await QRCode.toDataURL(qrData);
    res.json({ qr });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 