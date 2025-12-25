const express = require('express');
const Coupon = require('../models/Coupon');

const router = express.Router();

/* VALIDATE COUPON */
router.post('/validate', async (req, res) => {
  const { code, cartTotal } = req.body;

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
    expiresAt: { $gt: new Date() },
  });

  if (!coupon) {
    return res.status(400).json({ message: 'Invalid coupon' });
  }

  if (cartTotal < coupon.minCartValue) {
    return res.status(400).json({
      message: `Minimum cart value ₹${coupon.minCartValue}`,
    });
  }

  let discount = 0;

  if (coupon.type === 'flat') {
    discount = coupon.value;
  } else {
    discount = Math.floor((cartTotal * coupon.value) / 100);
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  }

  res.json({
    code: coupon.code,
    discount,
  });
});

module.exports = router;
