const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Coupon = require('../models/Coupon');
const CouponUsage = require('../models/CouponUsage');
const applyCoupon = require('../utils/applyCoupon');

const router = express.Router();

/**
 * CREATE ORDER
 */
router.post('/', async (req, res) => {
  try {
    const {
      items,
      phone,
      address,
      name,
      paymentMethod = 'COD',
      couponCode,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Calculate cart total
    const cartTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discount = 0;
    let allowCOD = true;
    let appliedCoupon = null;

    /**
     * APPLY COUPON (if provided)
     */
    if (couponCode) {
      const result = await applyCoupon({
        couponCode,
        phone,
        cartTotal,
      });

      discount = result.discount;
      allowCOD = result.allowCOD;
      appliedCoupon = result.coupon.code;

      // Save usage
      await CouponUsage.create({
        couponCode: result.coupon.code,
        phone,
        discountAmount: discount,
      });

      // Increment coupon usage count
      await Coupon.updateOne(
        { code: result.coupon.code },
        { $inc: { usedCount: 1 } }
      );
    }

    /**
     * ENFORCE COD RULES
     */
    let finalPaymentMethod = paymentMethod;
    if (!allowCOD && paymentMethod === 'COD') {
      finalPaymentMethod = 'PREPAID';
    }

    /**
     * CREATE ORDER
     */
    const order = await Order.create({
      items,
      phone,
      address,
      name,
      cartTotal,
      discount,
      finalAmount: cartTotal - discount,
      paymentMethod: finalPaymentMethod,
      couponCode: appliedCoupon,
      allowCOD,
      status: 'PLACED',
    });

    res.json({
      success: true,
      orderId: order._id,
      finalAmount: order.finalAmount,
      paymentMethod: finalPaymentMethod,
    });
  } catch (err) {
    console.error('Order error:', err);
    res.status(400).json({ message: err.toString() });
  }
});

/**
 * GET ORDERS BY PHONE (MY ORDERS)
 */
router.get('/my/:phone', async (req, res) => {
  const orders = await Order.find({ phone: req.params.phone })
    .sort({ createdAt: -1 });

  res.json(orders);
});

/**
 * ADMIN: GET ALL ORDERS
 */
router.get('/admin/all', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;



