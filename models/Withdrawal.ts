import mongoose from 'mongoose';

export interface Withdrawal extends mongoose.Document {
  date: Date;
  project: string;
  store: string;
  user: string;
  items: [
    {
      name: string;
      code: string;
      category: string;
      certificate: string;
      unit: string;
      unitPrice: number;
      quantity: number;
      store: string;
      project: string;
      user: string;
    },
  ];
}

const withdrawalSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      category: { type: String, required: true },
      certificate: { type: String, required: true },
      unit: { type: String, required: true },
      unitPrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
      },
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
});

export default mongoose.model<Withdrawal>('Withdrawal', withdrawalSchema);
