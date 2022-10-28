import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  store: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
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

  country: {
    type: String,
    required: true,
    default: 'Ethiopia',
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
});

export default mongoose.model<User>('User', userSchema);

// Language: typescript
// Path: models/User.ts
