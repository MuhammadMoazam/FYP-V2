const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/orderDB')
    .then(() => console.log('Connected to OrderDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const orderRoutes = require('./routes/order.routes');

// Use routes
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () =>
{
    console.log(`Order Service running on port ${PORT}`);
});
