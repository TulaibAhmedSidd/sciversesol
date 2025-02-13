// import mongoose from 'mongoose';

// const ItemSchema = new mongoose.Schema({
//   _id: {
//     type: mongoose.Schema.Types.ObjectId,
//     index: true,
//     required: true,
//     auto: true,
//   },
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   wattage: { type: String },
//   size: { type: String },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
// });

// const ProductSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   items: [ItemSchema],
// });

// // Export the model
// export default mongoose.models.Product || mongoose.model('Product', ProductSchema);


import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  // id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  // brand: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // Link to brand
  wattage: { type: String },
  size: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Link to category
});

export default mongoose.models.Product || mongoose.model('Product', ItemSchema);
