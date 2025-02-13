// models/Stats.js

import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  count: { type: Number, required: true },
  suffix: { type: String, default: "+" },
});

export default mongoose.models.Stats || mongoose.model('Stats', StatsSchema);
