import mongoose from 'mongoose';

const EmergencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  ambulance: { type: Boolean, default: false },
  fireEngine: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  evidenceFile: { type: String },
});

const Emergency = mongoose.model('Emergency', EmergencySchema);
export default Emergency; 