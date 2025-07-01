import express from 'express';
import axios from 'axios';

const router = express.Router();

// GET /api/geocode?lat=...&lon=...
router.get('/', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'jsonv2',
          lat,
          lon
        },
        headers: {
          'User-Agent': 'virtusa-traffic-app/1.0'
        }
      }
    );
    const address = response.data.display_name || 'Unknown location';
    res.json({ address });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch address' });
  }
});

export default router; 