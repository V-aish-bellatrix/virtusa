import mongoose from 'mongoose';

const FineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  violationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Violation', required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'unpaid' },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Fine = mongoose.model('Fine', FineSchema);
export default Fine; 