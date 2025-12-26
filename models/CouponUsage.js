const mongoose = require('mongoose');

const couponUsageSchema = new mongoose.Schema({
  couponCode: String,
  phone: String,
  orderId: mongoose.Schema.Types.ObjectId,
  discountAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model('CouponUsage', couponUsageSchema);
