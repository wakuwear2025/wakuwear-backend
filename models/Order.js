const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        title: String,
        price: Number,
        quantity: Number,

        // Shiprocket-ready fields
        sku: {
          type: String,
          default: 'WK-DEFAULT',
        },
        weight: {
          type: Number, // in kg
          default: 0.5,
        },
      },
    ],

    totalAmount: Number,

    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      state: {
        type: String,
        default: 'India',
      },
      country: {
        type: String,
        default: 'India',
      },
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'ONLINE'],
      default: 'COD',
    },

    isCOD: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED',
    },

    // Shiprocket-ready dimensions (cm)
    shipment: {
      length: {
        type: Number,
        default: 30,
      },
      breadth: {
        type: Number,
        default: 25,
      },
      height: {
        type: Number,
        default: 5,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

