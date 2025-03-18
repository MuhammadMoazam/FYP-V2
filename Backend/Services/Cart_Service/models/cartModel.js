const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the Cart schema
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Cart", cartSchema);
