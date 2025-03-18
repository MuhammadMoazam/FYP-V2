const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add an item to the cart
router.post("/", cartController.addCartItem);

// Get all items in a user's cart
router.get("/user/:userId", cartController.getCartItems);

// Update a cart item
router.patch("/", cartController.updateCartItem);

// Remove a cart item
router.delete("/:itemId", cartController.removeCartItem);

// Empty a user's cart
router.delete("/user/:userId", cartController.emptyCart);

module.exports = router;
