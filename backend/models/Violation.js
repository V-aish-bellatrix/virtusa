import mongoose from 'mongoose';

const ViolationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  fineAmount: { type: Number, required: true },
  status: { type: String, default: 'unpaid' },
  createdAt: { type: Date, default: Date.now },
  evidenceFile: { type: String },
});

const Violation = mongoose.model('Violation', ViolationSchema);
export default Violation; 