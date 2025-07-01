import express from 'express';
import geocodeRouter from './routes/geocode.js';

const app = express();

app.use(express.json());
app.use('/api/geocode', geocodeRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});