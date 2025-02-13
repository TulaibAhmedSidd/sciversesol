import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  approved: { type: Boolean, default: false }, // Default to pending approval
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
