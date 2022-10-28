import mongoose from 'mongoose';

export interface Role extends mongoose.Document {
  name: string;
  description: string;
  permissions: string[];
}

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  permissions: { type: [String], required: true },
});

export default mongoose.model<Role>('Role', roleSchema);
