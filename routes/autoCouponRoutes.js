const express = require('express');
const Coupon = require('../models/Coupon');
const applyCoupon = require('../utils/applyCoupon');

const router = express.Router();

/**
 * AUTO APPLY BEST COUPON
 */
router.post('/best', async (req, res) => {
  try {
    const { phone, cartTotal } = req.body;

    let bestDiscount = 0;
    let bestResult = null;

    const coupons = await Coupon.find({ isActive: true });

    for (const coupon of coupons) {
      try {
        const result = await applyCoupon({
          couponCode: coupon.code,
          phone,
          cartTotal,
        });

        if (result.discount > bestDiscount) {
          bestDiscount = result.discount;
          bestResult = result;
        }
      } catch (err) {
        // silently skip invalid coupons
      }
    }

    if (!bestResult) {
      return res.json({ applied: false });
    }

    res.json({
      applied: true,
      couponCode: bestResult.coupon.code,
      discount: bestResult.discount,
      allowCOD: bestResult.allowCOD,
    });
  } catch (err) {
    res.status(500).json({ message: 'Auto apply failed' });
  }
});

module.exports = router;
