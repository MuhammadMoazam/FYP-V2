const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    userName: { type: String },
    password: { type: String, required: true },
    name: {
        firstName: { type: String },
        lastName: { type: String }
    },
    phone: { type: String },
    addresses: [{
        country: { type: String },
        state: { type: String },
        city: { type: String },
        street: { type: String },
        postcode: { type: String },
        default: { type: Boolean, default: false }
    }],
    role: { type: String, default: "user" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = model("Users", userSchema);