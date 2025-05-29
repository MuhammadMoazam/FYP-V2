const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectToDB } = require("./database/db");
const authController = require("./controllers/Auth")
const cartController = require("./controllers/Cart")
const productRoutes = require("./routes/Product"); // Fixed case sensitivity
const { verifyToken } = require("./middleware/VerifyToken");
const { getUserData, updateUser } = require("./controllers/User");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
// Connect to DB
connectToDB();

// Routes
app.use("/api/products", productRoutes);

app.use("/api/signup", authController.signup);
app.use("/api/signin", authController.login);
app.use("/api/resend-otp", authController.resendOtp);
app.use("/api/verify-otp", authController.verifyOtp);

app.use('/api/get-user-data', verifyToken, getUserData);
app.use('/api/update-user', verifyToken, updateUser);

app.use("/api/cart/get-items", verifyToken, cartController.getCartItems);
app.use("/api/cart/add-item", verifyToken, cartController.addCartItem);
app.use("/api/cart/remove-item", verifyToken, cartController.removeCartItem);
app.use("/api/cart/update-item", verifyToken, cartController.updateCartItem);
app.use("/api/cart/empty", verifyToken, cartController.emptyCart);

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
{
  console.log(`Server running on http://localhost:${PORT}`);
});
