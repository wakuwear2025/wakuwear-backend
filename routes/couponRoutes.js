const express = require('express');
const Coupon = require('../models/Coupon');

const router = express.Router();

/* CREATE COUPON (ADMIN) */
router.post('/', async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* LIST COUPONS */
router.get('/', async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
});

module.exports = router;

