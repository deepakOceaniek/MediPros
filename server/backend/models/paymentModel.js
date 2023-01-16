const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type:String,
    default:"pending",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);