const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,

    items: [
      {
        productId: String,
        title: String,
        price: Number,
        quantity: Number,
      },
    ],

    total: Number,

    paymentMethod: {
      type: String,
      default: 'COD',
    },

    status: {
      type: String,
      default: 'pending',
    },

    shipment: {
      awb: String,
      courier: String,
      status: {
        type: String,
        default: 'not_created',
      },
      rtoReason: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);


