const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Order failed' });
  }
});

module.exports = router;
