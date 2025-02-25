const Cart = require("../models/cartModel");

// Add a product to the cart
exports.addCartItem = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    const addedCartItem = new Cart({
      user,
      product,
      quantity,
    });

    await addedCartItem.save();
    res.status(201).json(addedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

// Get all items in a user's cart
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ user: userId }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// Update the quantity of an item in the cart
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const updatedItem = await Cart.findByIdAndUpdate(
      itemId,
      { quantity },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const removedItem = await Cart.findByIdAndDelete(itemId);
    res.status(200).json(removedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing cart item" });
  }
};

// Empty the user's cart
exports.emptyCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.deleteMany({ user: userId });
    res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error emptying the cart" });
  }
};
