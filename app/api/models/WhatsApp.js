import mongoose from 'mongoose';

const WhatsAppSchema = new mongoose.Schema({
  WhatsAppNumber: { type: String, required: true, unique: true },
  makePrimary: { type: Boolean, default: false }, // Only one number can be primary
});

export default mongoose.models.WhatsApp || mongoose.model('WhatsApp', WhatsAppSchema);
