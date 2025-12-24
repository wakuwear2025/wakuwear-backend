const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;
