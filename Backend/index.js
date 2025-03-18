const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectToDB } = require("./database/db");
const authController = require("./controllers/Auth")
const cartController = require("./controllers/Cart")
//const productRoutes = require("./Product_Service/routes/productRoutes"); // Adjust path as need
const { verifyToken } = require("./middleware/VerifyToken");
const { getUserData, updateUser } = require("./controllers/User");
const morgan = require("morgan");
const axios = require("axios");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
// Connect to DB
connectToDB();

// Routes

// User Service Routes
app.use('/api/get-user-data', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/get-user-data`, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.use('/api/update-user', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/update-user-data`, { ...req.body }, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

app.use('/api/signup', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/signup`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Failed to sign up" });
  }
});

app.use("/api/signin", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/signin`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Failed to sign in" });
  }
});

app.use("/api/resend-otp", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/resend-otp`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
});

app.use("/api/verify-otp", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/verify-otp`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// Products Service Routes

app.use("/api/get-products", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.PRODUCTS_SERVICE_URL}/get-products`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});

app.use("/api/get-product", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.PRODUCTS_SERVICE_URL}/get-product`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Failed to get product" });
  }
});

// Cart Service Routes

app.use("/api/get-cart-items", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.CART_SERVICE_URL}/get-items`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ error: "Failed to get cart items" });
  }
});

app.use("/api/add-cart-item", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.CART_SERVICE_URL}/add-item`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error adding cart item:", error);
    res.status(500).json({ error: "Failed to add cart item" });
  }
});

app.use("/api/remove-cart-item", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.CART_SERVICE_URL}/remove-item`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error remove cart item:", error);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
});

app.use("/api/update-cart-item", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.CART_SERVICE_URL}/update-item`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

app.use("/api/empty-cart", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.CART_SERVICE_URL}/empty-cart`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error emptying cart:", error);
    res.status(500).json({ error: "Failed to empty cart" });
  }
});

// Order Service Routes

app.use("/api/get-orders", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ORDER_SERVICE_URL}/get-orders`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Failed to get orders" });
  }
});

app.use("/api/get-order", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ORDER_SERVICE_URL}/get-order`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Failed to get order" });
  }
});

app.use("/api/place-order", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ORDER_SERVICE_URL}/place-order`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

app.use("/api/cancel-order", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ORDER_SERVICE_URL}/cancel-order`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

app.use("/api/update-order-shipping-status", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ORDER_SERVICE_URL}/update-order-shipping-status`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error updating order shipping status:", error);
    res.status(500).json({ error: "Failed to update order shipping status" });
  }
});

// Payment Service Routes

app.use("/api/create-payment-intent", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.PAYMENT_SERVICE_URL}/create-payment-intent`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

app.use("/api/get-payment-intent", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.PAYMENT_SERVICE_URL}/get-payment-intent`, req.body, { headers: { Authorization: req.headers.authorization } });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting payment intent:", error);
    res.status(500).json({ error: "Failed to get payment intent" });
  }
});

app.use("/api/handle-stripe-webhook", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.PAYMENT_SERVICE_URL}/handle-stripe-webhook`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    res.status(500).json({ error: "Failed to handle Stripe webhook" });
  }
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
