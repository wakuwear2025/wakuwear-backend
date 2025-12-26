const Coupon = require('../models/Coupon');
const CouponUsage = require('../models/CouponUsage');
const Order = require('../models/Order');

module.exports = async function applyCoupon({
  couponCode,
  phone,
  cartTotal,
}) {
  const coupon = await Coupon.findOne({
    code: couponCode.toUpperCase(),
    isActive: true,
  });

  if (!coupon) throw 'Invalid coupon';

  if (coupon.expiry && coupon.expiry < new Date())
    throw 'Coupon expired';

  if (cartTotal < coupon.minOrderValue)
    throw `Minimum order ₹${coupon.minOrderValue}`;

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)
    throw 'Coupon usage limit reached';

  if (coupon.oneTimePerPhone) {
    const used = await CouponUsage.findOne({ couponCode, phone });
    if (used) throw 'Coupon already used';
  }

  if (coupon.firstOrderOnly) {
    const prev = await Order.findOne({ phone });
    if (prev) throw 'Only for first order';
  }

  let discount =
    coupon.type === 'flat'
      ? coupon.value
      : Math.round((cartTotal * coupon.value) / 100);

  if (coupon.maxDiscount)
    discount = Math.min(discount, coupon.maxDiscount);

  return {
    discount,
    allowCOD: coupon.allowCOD,
    coupon,
  };
};
