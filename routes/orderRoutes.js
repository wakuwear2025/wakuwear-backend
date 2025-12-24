const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

/**
 * CREATE ORDER
 */
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Order failed' });
  }
});

/**
 * GET ORDERS BY PHONE (My Orders)
 * /orders?phone=9999999999
 */
router.get('/', async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ message: 'Phone required' });
    }

    const orders = await Order.find({
      'customer.phone': phone,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

/**
 * ADMIN: GET ALL ORDERS
 * /orders/admin
 */
router.get('/admin/all', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;

