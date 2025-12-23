const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['men', 'women', 'winter', 'festive'],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
