import mongoose from 'mongoose';

const PushSubscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const PushSubscription = mongoose.model('PushSubscription', PushSubscriptionSchema);
export default PushSubscription; 