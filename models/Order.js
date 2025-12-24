const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        title: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },
    paymentMethod: {
      type: String,
      default: 'COD',
    },
    status: {
      type: String,
      default: 'PLACED',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
