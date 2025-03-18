const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  in_stock: { type: Number, required: true },
  price: { type: String, required: true },
  discount: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted: { type: Boolean, default: false },
});

module.exports = model("Products", productSchema);
