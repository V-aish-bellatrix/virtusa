import express from 'express';
import webpush from 'web-push';
import PushSubscription from '../models/PushSubscription.js';
import dotenv from 'dotenv';
dotenv.config();

webpush.setVapidDetails(
  'mailto:admin@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const router = express.Router();

// Save a push subscription
router.post('/subscribe', async (req, res) => {
  const { userId, subscription } = req.body;
  try {
    const sub = new PushSubscription({
      userId,
      endpoint: subscription.endpoint,
      keys: subscription.keys,
    });
    await sub.save();
    res.status(201).json({ message: 'Subscription saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send a test notification
router.post('/notify', async (req, res) => {
  const { userId, title, body } = req.body;
  try {
    const sub = await PushSubscription.findOne({ userId });
    if (!sub) return res.status(404).json({ message: 'No subscription found' });
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: sub.keys,
      },
      JSON.stringify({ title: title || 'Test', body: body || 'This is a test notification.' })
    );
    res.json({ message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 