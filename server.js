const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);


mongoose.connect(process.env.MONGO_URI, {
  authSource: 'admin',
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
app.get('/', (req, res) => {
  res.send('Wakuwear API running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

