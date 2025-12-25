const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

/* GET all orders */
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

/* UPDATE order status */
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

/* UPDATE shipment info (Shiprocket-ready) */
router.put('/orders/:id/shipment', async (req, res) => {
  try {
    const { awb, courier, status, rtoReason } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        shipment: {
          awb,
          courier,
          status,
          rtoReason,
        },
      },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update shipment' });
  }
});

module.exports = router;

