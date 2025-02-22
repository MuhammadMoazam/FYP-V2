const express = require("express");
const { getProducts } = require("../controllers/Product");
const router = express.Router();

router.get("/", getProducts);

module.exports = router;
