const Cart = require("../models/cartModel");
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// Add a product to the cart
exports.addCartItem = async (req, res) => {
  try {
    const user = req.user;
    const { item } = req.body;

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user });
    }

    const product = await axios.post(`${process.env.PRODUCTS_SERVICE_URL}/get-product`, { id: item }).then((response) => response.data);

    cart.products.push({ product: product._id, quantity: 1, total: (Number.parseInt(product.price) * Number.parseInt(product.discount) / 100).toFixed(0) });
    cart.total = (cart.total + (Number.parseInt(product.price) * Number.parseInt(product.discount) / 100)).toFixed(0);

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

// Get all items in a user's cart
exports.getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// Update the quantity of an item in the cart
exports.updateCartItem = async (req, res) => {
  try {
    const { item, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.map((product) => {
      if (product._id.toString() === item) {
        const newTotal = (quantity * product.total / product.quantity).toFixed(0);
        return { ...product, quantity, total: newTotal };
      }
      return product;
    });
    cart.total = cart.products.reduce((total, product) => total + product.total, 0).toFixed(0);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  try {
    const { item } = req.body;

    let cart = await Cart.findOne({ user: req.user });

    const updatedItems = cart.products.filter((product) => product._id.toString() !== item);

    cart.products = updatedItems;
    cart.total = cart.products.reduce((total, product) => total + product.total, 0).toFixed(0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing cart item" });
  }
};

// Empty the user's cart
exports.emptyCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({ user });
    cart.products = [];
    cart.total = 0;
    await cart.save();
    res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error emptying the cart" });
  }
};
