const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

/* ROUTES */
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const couponRoutes = require('./routes/couponRoutes');

/* INIT APP */
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminOrderRoutes);
app.use('/coupons', couponRoutes);

/* ROOT */
app.get('/', (req, res) => {
  res.send('Wakuwear API running');
});

/* DB */
mongoose
  .connect(process.env.MONGO_URI, {
    authSource: 'admin',
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err.message));

/* START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});



