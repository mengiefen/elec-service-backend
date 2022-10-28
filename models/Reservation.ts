import mongoose from 'mongoose';

export interface Reservation extends mongoose.Document {
  startDate: Date;
  endDate: Date;
  project: string;
  store: string;
  user: string;
  items: [
    {
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
    },
  ];
}

const reservationSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
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
      specification: { type: String, required: true },
      calibrationDate: { type: Date, required: true },
      quantity: { type: Number, required: true },
      dailyPrice: { type: Number, required: true },
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

export default mongoose.model<Reservation>('Reservation', reservationSchema);
