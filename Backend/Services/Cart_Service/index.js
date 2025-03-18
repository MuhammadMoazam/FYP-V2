const express = require("express");
const mongoose = require("mongoose");
const cartController = require("./controllers/cartController.js")
const cartRoutes = require("./routes/cartRoutes.js");
const { verifyToken } = require("../../middleware/VerifyToken.js");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5003;

// Middleware
app.use(express.json()); // To parse incoming JSON data

// Routes
app.use("/get-items", verifyToken, cartController.getCartItems);
app.use("/add-item", verifyToken, cartController.addCartItem);
app.use("/remove-item", verifyToken, cartController.removeCartItem);
app.use("/update-item", verifyToken, cartController.updateCartItem);
app.use("/empty", verifyToken, cartController.emptyCart);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Cart Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(port, () => {
  console.log(`Cart Service is running on http://localhost:${port}`);
});
