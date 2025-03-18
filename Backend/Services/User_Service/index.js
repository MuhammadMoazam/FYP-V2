const express = require("express");
const mongoose = require("mongoose");
const { getUserData, updateUser, signup, login, resendOtp, verifyOtp } = require("./controller/userController");
const { verifyToken } = require("../../middleware/VerifyToken");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // To parse incoming JSON data

// Routes
app.use('/get-user-data', verifyToken, getUserData);
app.use('/update-user-data', verifyToken, updateUser);

app.use("/signup", signup);
app.use("/signin", login);
app.use("/resend-otp", resendOtp);
app.use("/verify-otp", verifyOtp);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("User Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(port, () => {
  console.log(`User Service is running on http://localhost:${port}`);
});
