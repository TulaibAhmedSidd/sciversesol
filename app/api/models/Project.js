// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: false },
  image: { type: String, required: true },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
