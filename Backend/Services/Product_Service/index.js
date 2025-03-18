const express = require("express");
const mongoose = require("mongoose");
const { getAllProducts, getProduct, addProduct, removeProduct, updateProduct } = require("./controllers/productController")

const dotenv = require("dotenv");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/get-products", getAllProducts);
app.use("/get-product", getProduct);
// admin-access
app.use("/add-product", verifyAdmin, addProduct);
app.use("/remove-product", verifyAdmin, removeProduct);
app.use("/update-product", verifyAdmin, updateProduct);

// MongoDB Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Product Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
