import mongoose from 'mongoose';

export interface Storage extends mongoose.Document {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  branch: string;
}

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Storage>('Storage', storeSchema);
