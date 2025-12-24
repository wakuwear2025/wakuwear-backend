const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  title: String,
  quantity: Number,
  price: Number,
  sku: {
    type: String,
    default: '',
  },
});

const AddressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  city: String,
  state: {
    type: String,
    default: 'NA',
  },
  pincode: String,
  country: {
    type: String,
    default: 'India',
  },
});

const OrderSchema = new mongoose.Schema(
  {
    orderRef: {
      type: String,
      unique: true,
    },

    items: [OrderItemSchema],

    customer: AddressSchema,

    paymentMethod: {
      type: String,
      enum: ['COD', 'PREPAID'],
      default: 'COD',
    },

    totalAmount: Number,

    status: {
      type: String,
      enum: [
        'PLACED',
        'CONFIRMED',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'RTO',
      ],
      default: 'PLACED',
    },

    // 🔑 Shiprocket readiness
    shipmentId: String,
    awbCode: String,
    courierName: String,
    shiprocketStatus: String,

    isCod: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

