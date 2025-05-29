const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/userDB')
    .then(() => console.log('Connected to UserDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth.routes');

// Use routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () =>
{
    console.log(`User Service running on port ${PORT}`);
});
