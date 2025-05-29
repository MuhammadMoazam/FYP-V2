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
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cartDB')
    .then(() => console.log('Connected to CartDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const cartRoutes = require('./routes/cart.routes');

// Use routes
app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () =>
{
    console.log(`Cart Service running on port ${PORT}`);
});
