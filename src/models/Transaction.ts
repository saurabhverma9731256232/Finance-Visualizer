import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true, // Now required for Stage 2
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
