const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true },
  type: { type: String, enum: ['flat', 'percent'], required: true },
  value: Number,

  minOrderValue: { type: Number, default: 0 },
  maxDiscount: Number,

  expiry: Date,

  usageLimit: Number,
  usedCount: { type: Number, default: 0 },

  oneTimePerPhone: { type: Boolean, default: false },
  firstOrderOnly: { type: Boolean, default: false },

  allowCOD: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);

