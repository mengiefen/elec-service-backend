import mongoose from 'mongoose';

export interface Project extends mongoose.Document {
  name: string;
  division: string;
  category: string;
  pm: string;
}

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  division: { type: String, required: true },
  category: { type: String, required: true },
  pm: { type: String, required: true },
});

export default mongoose.model<Project>('Store', projectSchema);
