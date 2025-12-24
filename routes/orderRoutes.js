const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // IMPORTANT: return the full order
    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Order failed' });
  }
});

module.exports = router;

