const express = require("express");
const mongoose = require("mongoose");
const { createPaymentIntent, handleStripeWebhook, getPaymentIntent } = require("./controller/paymentController");
const { verifyToken } = require("../../middleware/VerifyToken");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5005;

// Middleware
app.use(express.json()); // To parse incoming JSON data

// Routes
app.use('/create-payment-intent', verifyToken, createPaymentIntent);
app.use('/get-payment-intent', verifyToken, getPaymentIntent);
app.use('/handle-stripe-webhook', handleStripeWebhook);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Payment Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(port, () => {
  console.log(`Payment Service is running on http://localhost:${port}`);
});
