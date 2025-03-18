const express = require("express");
const mongoose = require("mongoose");
const { getAllLogs, log } = require("./controllers/logController");

const dotenv = require("dotenv");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/log", verifyAdmin, log);
app.use("/get-logs", verifyAdmin, getAllLogs);

// MongoDB Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Logging Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Logging Service running on port ${PORT}`));
