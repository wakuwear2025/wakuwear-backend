const express = require('express');
const Product = require('../models/Product.js');

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
// TEMP: seed products
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany();

    const products = await Product.insertMany([
      {
        title: 'Wakuwear Winter Hoodie',
        price: 1999,
        mrp: 2999,
        image: 'https://picsum.photos/400/500?1',
        category: 'winter',
      },
      {
        title: 'Wakuwear Minimal Tee',
        price: 999,
        mrp: 1499,
        image: 'https://picsum.photos/400/500?2',
        category: 'men',
      },
      {
        title: 'Wakuwear Oversized Sweatshirt',
        price: 1799,
        mrp: 2499,
        image: 'https://picsum.photos/400/500?3',
        category: 'winter',
      },
    ]);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Seed failed' });
  }
});


module.exports = router;
