const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  throw new Error("Missing Razorpay environment variables");
}

// Create an order
exports.createOrder = (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const { amount, currency, receipt } = req.body;

  // Validate request body
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ msg: "Invalid amount" });
  }
  if (!currency || typeof currency !== "string") {
    return res.status(400).json({ msg: "Invalid currency" });
  }
  if (!receipt || typeof receipt !== "string") {
    return res.status(400).json({ msg: "Invalid receipt ID" });
  }

  const options = { amount: amount * 100, currency, receipt };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Error in createOrder:", err.message);
      return res.status(500).json({ msg: "Order creation failed" });
    }

    res.status(200).json(order);
  });
};

// Validate payment
exports.validatePayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Validate input
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return res.status(400).json({ msg: "Invalid payment validation parameters" });
  }

  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid payment signature" });
    }

    res.status(200).json({
      msg: "Payment validation successful",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Error in validatePayment:", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
