const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ROUTES (⚠️ casing must match filenames EXACTLY)
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

/**
 * =====================
 * MIDDLEWARE (ORDER MATTERS)
 * =====================
 */
app.use(cors());
app.use(express.json()); // MUST be before routes

/**
 * =====================
 * ROUTES
 * =====================
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Wakuwear API running');
});

/**
 * =====================
 * DATABASE CONNECTION
 * =====================
 */
mongoose
  .connect(process.env.MONGO_URI, {
    authSource: 'admin',
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

/**
 * =====================
 * SERVER START
 * =====================
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


