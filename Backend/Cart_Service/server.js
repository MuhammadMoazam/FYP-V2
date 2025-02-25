const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cartRoutes = require("./routes/cartRoutes.js");

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5003;

// Middleware
app.use(express.json()); // To parse incoming JSON data

// Routes
app.use("/api/cart", cartRoutes);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Product Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(port, () => {
  console.log(`Cart Service is running on http://localhost:${port}`);
});
