const bcrypt = require("bcryptjs");
const Order = require("../models/orderModel");
const { generateTrackingNumber } = require("../utils/generateTrackingNumber");
const axios = require("axios");
require("dotenv").config();

async function placeOrder(req, res) {
  try {
    const { firstName, lastName, country, state, city, street, postcode, phone, email, orderItems, paymentMethod } = req.body.order_details;

    const order = new Order({
      added: new Date(),
      user: req.user,
      phone,
      email,
      tracking_number: generateTrackingNumber(),
      address: `${street}, ${city}, ${state}, ${country}, ${postcode}`,
      products: orderItems.map((item) => ({ product: item._id, quantity: item.quantity })),
      payment: {
        method: paymentMethod,
        status: "Pending",
      },
      shipping_info: {
        status: "Pending",
      },
      total: orderItems.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate the total price
    });
    await order.save();

    // get user data to compare
    const user = await axios.get(`${process.env.USER_SERVICE_URL}/get-user-data`, { headers: { Authorization: req.headers.authorization } }).then(res => res.data);
    // Update the user's addresses
    await axios.post(`${process.env.USER_SERVICE_URL}/update-user-data`, { name: { firstName: user?.name?.firstName ?? firstName, lastName: user?.name?.lastName ?? lastName }, phone: user?.phone ?? phone, addresses: [...user?.addresses ?? [], { country, state, city, street, postcode, default: user?.adresses?.length === 0 }] }, { headers: { Authorization: req.headers.authorization } });

    //empty cart
    await axios.post(`${process.env.CART_SERVICE_URL}/empty`, {}, { headers: { Authorization: req.headers.authorization } });

    res.status(200).json({ message: "success", order });
  } catch (error) {
    console.log("🚀 ------------------------------🚀")
    console.log("🚀 ~ placeOrder ~ error:", error)
    console.log("🚀 ------------------------------🚀")
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
}

async function cancelOrder(req, res) {
  try {
    const orderId = req.body.orderId;
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }

    order.shipping_info.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.log("🚀 -------------------------------🚀")
    console.log("🚀 ~ cancelOrder ~ error:", error)
    console.log("🚀 -------------------------------🚀")
    res.status(500).json({ message: "Failed to cancel order", error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user }).sort({ added: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const order = await Order.findOne({ _id: req.body.order, user: req.user });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
}

async function updateOrderShippingStatus(req, res) {
  try {
    let order = await Order.findById(req.body.orderId);
    order.shipping_info = {
      status: req.body.status,
      carrier: req.body.carrier,
      carrier_tracking_number: req.body.carrier_tracking_number,
      delivery_date: req.body.delivery_date,
      ...order.shipping_info,
    };
    order.updated = new Date();
    await order.save();

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.log("🚀 ---------------------------------------------🚀")
    console.log("🚀 ~ updateOrderShippingStatus ~ error:", error)
    console.log("🚀 ---------------------------------------------🚀")
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
}

module.exports = { placeOrder, cancelOrder, getOrders, getOrder, updateOrderShippingStatus };