import mongoose from 'mongoose';

// Equipment schema
const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Appliance setup schema (dynamic list of appliances)
const ApplianceSetupSchema = new mongoose.Schema({
  appliance: { type: String, required: true }, // Name of the appliance
  count: { type: Number, required: true }, // Count of the appliance
});

// Plan schema
const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false },
  equipment: [EquipmentSchema], // List of equipment
  totalPrice: { type: Number, required: true },
  description: { type: String },
  applianceSetup: [ApplianceSetupSchema], // List of appliances with counts
});

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
