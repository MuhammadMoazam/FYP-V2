const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    order: { type: Schema.Types.ObjectId, unique: true, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    card_details: {
        card_holder_name: { type: String, required: true },
        card_number: { type: String, required: true },
        expiry_date: { type: String, required: true },
        cvv: { type: String, required: true },
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = model("Payments", paymentSchema);