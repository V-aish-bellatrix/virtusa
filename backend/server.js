import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import redis from 'redis';
import authRouter from './routes/auth.js';
import sosRouter from './routes/sos.js';
import emergenciesRouter from './routes/emergencies.js';
import violationsRouter from './routes/violations.js';
import finesRouter from './routes/fines.js';
import notificationsRouter from './routes/notifications.js';
import aiRouter from './routes/ai.js';
import dashboardRouter from './routes/dashboard.js';
import path from 'path';
import { fileURLToPath } from 'url';
import pushRouter from './routes/push.js';
import geocodeRouter from './routes/geocode.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB (Mongoose) setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Redis setup (optional)
let redisClient;
if (process.env.REDIS_URL) {
  redisClient = redis.createClient({ url: process.env.REDIS_URL });
  redisClient.connect().catch(console.error);
}

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Placeholder routes
app.use('/api/auth', authRouter);
app.use('/api/sos', sosRouter);
app.use('/api/emergencies', emergenciesRouter);
app.use('/api/violations', violationsRouter);
app.use('/api/fines', finesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/push', pushRouter);
app.use('/api/geocode', geocodeRouter);

// Serve uploads statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 