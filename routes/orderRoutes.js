const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

/**
 * =========================
 * CREATE ORDER (CUSTOMER)
 * =========================
 */
router.post('/', async (req, res) => {
  try {
    const { items, customer, totalAmount, paymentMethod } = req.body;

    if (!items || !customer || !totalAmount) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    // 🔑 Clean merchant order reference (Shiprocket-friendly)
    const orderRef = `WK-${Date.now()}`;

    const order = new Order({
      orderRef,
      items: items.map(item => ({
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        sku: item.sku || '',
      })),
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state || 'NA',
        pincode: customer.pincode,
        country: 'India',
      },
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
      isCod: paymentMethod !== 'PREPAID',
      status: 'PLACED',
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error('Order create error:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

/**
 * =========================
 * GET CUSTOMER ORDERS (BY PHONE)
 * =========================
 */
router.get('/', async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number required' });
  }

  try {
    const orders = await Order.find({
      'customer.phone': phone,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

/**
 * =========================
 * GET SINGLE ORDER (OPTIONAL)
 * =========================
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(404).json({ message: 'Order not found' });
  }
});

/**
 * =========================
 * ADMIN: GET ALL ORDERS
 * =========================
 */
router.get('/admin/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin orders' });
  }
});

/**
 * =========================
 * ADMIN: UPDATE ORDER STATUS
 * =========================
 */
router.patch('/admin/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status required' });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;


