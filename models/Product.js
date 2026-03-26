const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  care_instructions: { type: String },
  image_filename: { type: String },
  is_featured: { type: Boolean, default: false },
  is_best_seller: { type: Boolean, default: false },
  category_id: { type: Number },
  stock: { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
