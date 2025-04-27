const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    shipping_info: {
        status: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        carrier: {
            type: String,
        },
        carrier_tracking_number: {
            type: String,
        },
        delivery_date: {
            type: Date,
        }
    },
    tracking_number: {
        type: String,
        required: true,
    },
    payment: {
        method: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    added: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
    },
});

module.exports = model("Order", orderSchema);
