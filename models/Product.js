const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    mrp: Number,
    image: String,

    gender: {
      type: String,
      enum: ['men', 'women', 'kids'],
      required: true,
    },

    category: {
      type: String,
      enum: [
        // Men
        'men_tshirts',
        'men_jeans',
        'men_hoodies',
        'men_sweatshirts',

        // Women
        'women_tops',
        'women_dresses',
        'women_jeans',
        'women_hoodies',

        // Kids
        'kids_tshirts',
        'kids_sets',
        'kids_winterwear',
      ],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
