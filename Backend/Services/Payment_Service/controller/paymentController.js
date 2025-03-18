const bcrypt = require("bcryptjs");
const axios = require("axios");
const Payment = require("../models/paymentModel");

const dotenv = require('dotenv');
dotenv.config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK);

async function createPaymentIntent(req, res) {
  try {
    const order = req.body.order;
    const amount = order.total * 100;
    const currency = "usd";
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order: order._id,
      },
    });
    console.log("🚀 -------------------------------------------------------🚀")
    console.log("🚀 ~ createPaymentIntent ~ paymentIntent:", paymentIntent)
    console.log("🚀 -------------------------------------------------------🚀")
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("🚀 ---------------------------------------🚀")
    console.log("🚀 ~ createPaymentIntent ~ error:", error)
    console.log("🚀 ---------------------------------------🚀")
    res.status(500).json({ error: error.message });
  }
};

async function getPaymentIntent(req, res) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.body.id);
    console.log("🚀 ----------------------------------------------------🚀")
    console.log("🚀 ~ getPaymentIntent ~ paymentIntent:", paymentIntent)
    console.log("🚀 ----------------------------------------------------🚀")
    res.status(200).json({ status: paymentIntent.status });
  } catch (error) {
    console.error("Error fetching payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};

// Handle Stripe Webhooks
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log("🚀 -----------------------------------🚀")
    console.log("🚀 ~ handleStripeWebhook ~ err:", err)
    console.log("🚀 -----------------------------------🚀")
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    console.log('Payment succeeded:', event.data.object);
  }

  res.json({ received: true });
};

module.exports = { createPaymentIntent, getPaymentIntent, handleStripeWebhook };