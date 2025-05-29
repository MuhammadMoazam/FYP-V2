const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: String, required: true },
  discountedPrice: { type: String, required: true },
  discount: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);