const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Health check endpoint
router.get('/health', (req, res) =>
{
    res.status(200).send('OK');
});

// Login route
router.post('/login', async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
        {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
        {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// Register route
router.post('/register', async (req, res) =>
{
    try
    {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            email,
            password,
            name
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
