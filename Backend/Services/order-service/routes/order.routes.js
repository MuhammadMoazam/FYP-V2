const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Health check endpoint
router.get('/health', (req, res) =>
{
    res.status(200).send('OK');
});

// Create new order
router.post('/', async (req, res) =>
{
    try
    {
        const order = new Order(req.body);
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) =>
{
    try
    {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// Get single order
router.get('/:id', async (req, res) =>
{
    try
    {
        const order = await Order.findById(req.params.id);
        if (!order)
        {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) =>
{
    try
    {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order)
        {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

// Update payment status
router.patch('/:id/payment', async (req, res) =>
{
    try
    {
        const { paymentStatus } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentStatus },
            { new: true }
        );
        if (!order)
        {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
