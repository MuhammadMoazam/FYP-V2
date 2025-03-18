const express = require("express");
const mongoose = require("mongoose");
const { placeOrder, cancelOrder, getOrders, updateOrderShippingStatus, getOrder } = require("./controller/orderController")
const { verifyToken } = require("../../middleware/VerifyToken");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5004;

// Middleware
app.use(express.json()); // To parse incoming JSON data

// Routes
app.use('/place-order', verifyToken, placeOrder);
app.use('/cancel-order', verifyToken, cancelOrder);
app.use('/get-orders', verifyToken, getOrders);
app.use('/get-order', verifyToken, getOrder);
app.use('/update-order-shipping-status', verifyToken, updateOrderShippingStatus);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Order Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(port, () => {
  console.log(`Order Service is running on http://localhost:${port}`);
});
