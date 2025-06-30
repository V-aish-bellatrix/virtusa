import mongoose from 'mongoose';

const SOSEventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  description: { type: String },
});

const SOSEvent = mongoose.model('SOSEvent', SOSEventSchema);
export default SOSEvent; 