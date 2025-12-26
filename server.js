const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');

const app = express(); // ✅ MUST be before app.use

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/coupons', couponRoutes);

/* ROOT */
app.get('/', (req, res) => {
  res.send('Wakuwear API running');
});

/* DB */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

/* START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on port ${PORT}`)
);




