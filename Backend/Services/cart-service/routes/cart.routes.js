const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');

// Health check endpoint
router.get('/health', (req, res) =>
{
    res.status(200).send('OK');
});

// Get cart by userId
router.get('/:userId', async (req, res) =>
{
    try
    {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart)
        {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

// Add item to cart
router.post('/add', async (req, res) =>
{
    try
    {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });

        if (!cart)
        {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else
        {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1)
            {
                cart.items[itemIndex].quantity += quantity;
            } else
            {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

// Update cart item quantity
router.put('/update', async (req, res) =>
{
    try
    {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart)
        {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1)
        {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.json(cart);
        } else
        {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

// Remove item from cart
router.delete('/remove', async (req, res) =>
{
    try
    {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart)
        {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
