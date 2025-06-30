import express from 'express';
const router = express.Router();

// Central dashboard (stub)
router.get('/central', (req, res) => {
  res.json({
    emergencies: 10,
    violations: 25,
    finesCollected: 5000,
    activeCops: 8,
  });
});

// Cop dashboard (stub)
router.get('/cop', (req, res) => {
  res.json({
    myEmergencies: 2,
    myViolations: 5,
    myFines: 1200,
  });
});

export default router; 