const axios = require("axios");
const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("🚀 -------------------------------🚀")
    console.log("🚀 ~ getProducts ~ error:", error)
    console.log("🚀 -------------------------------🚀")
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ------------------------------🚀")
    console.log("🚀 ~ getProduct ~ error:", error)
    console.log("🚀 ------------------------------🚀")
    res.status(500).json({ message: "Error fetching product", error });
  }
};


// admin access
const addProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      in_stock: req.body.in_stock,
      price: req.body.price,
      discount: req.body.discount,
      created_at: Date.now(),
    });
    await product.save();

    // log the admin action
    await axios.post(`${process.env.LOGS_SERVICE_URL}/log`, { action: "created", user: req.body.user, collection_affected: "products", document_affected: product._id });

    res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ------------------------------🚀")
    console.log("🚀 ~ addProduct ~ error:", error)
    console.log("🚀 ------------------------------🚀")
    res.status(500).json({ message: "Error adding product", error });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body.product, {
      deleted: true
    })

    // log the admin action
    await axios.post(`${process.env.LOGS_SERVICE_URL}/log`, { action: "deleted", user: req.body.user, collection_affected: "products", document_affected: product._id, previous_data: product });

    res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ---------------------------------🚀")
    console.log("🚀 ~ removeProduct ~ error:", error)
    console.log("🚀 ---------------------------------🚀")
    res.status(500).json({ message: "Error removing product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updated_product = await Product.findByIdAndUpdate(req.body.product, {
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      image: req.body.image || product.image,
      category: req.body.category || product.category,
      in_stock: req.body.in_stock || product.in_stock,
      price: req.body.price || product.price,
      discount: req.body.discount || product.discount,
      updated_at: Date.now(),
    }, { new: true });

    // log the admin action
    await axios.post(`${process.env.LOGS_SERVICE_URL}/log`, { action: "update", user: req.body.user, collection_affected: "products", document_affected: updatedProduct._id, previous_data: product });

    res.status(200).json(updated_product);
  } catch (error) {
    console.log("🚀 ---------------------------------🚀")
    console.log("🚀 ~ updateProduct ~ error:", error)
    console.log("🚀 ---------------------------------🚀")
    res.status(500).json({ message: "Error updating product", error });
  }
}


module.exports = { getAllProducts, getProduct, addProduct, removeProduct, updateProduct };