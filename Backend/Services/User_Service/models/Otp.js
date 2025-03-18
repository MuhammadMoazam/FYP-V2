const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const dotenv = require("dotenv");
dotenv.config();

const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    expires_at: { type: Date, default: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME) }
});

module.exports = model("OTPs", otpSchema);