const express = require('express');
const Product = require('../models/product');

const router = express.Router();

/**
 * GET /products
 * Query params:
 * ?gender=men | women | kids
 * ?category=men_tshirts | women_jeans | etc
 * ?sort=new | price_asc | price_desc
 */
router.get('/', async (req, res) => {
  try {
    const { gender, category, sort } = req.query;

    const filter = { isActive: true };

    if (gender) filter.gender = gender;
    if (category) filter.category = category;

    let sortOption = { createdAt: -1 }; // default: New arrivals

    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const products = await Product.find(filter).sort(sortOption);

    res.json(products);
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;

