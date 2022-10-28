import mongoose from 'mongoose';

export interface Equipment extends mongoose.Document {
  name: string;
  code: string;
  category: string;
  specification: string;
  calibrationDate: Date;
  quantity: number;
  dailyPrice: number;
  store: string;
  project: string;
  user: string;
  status: string; // Available, Reserved, Withdrawn or New, Old, Broken, Lost
}

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: String, required: true },
  specification: { type: String, required: true },
  calibrationDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  dailyPrice: { type: Number, required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
});

export default mongoose.model<Equipment>('Equipment', equipmentSchema);
