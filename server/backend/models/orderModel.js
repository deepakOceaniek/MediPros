const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  ordersBy: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
      quantity: {
        type: Number,
      },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      name: { type: String },
      price: { type: Number },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      discount: { type: Number },
      quantity: { type: Number, default: 1 },

      prescription: {
        type: mongoose.Schema.ObjectId,
        ref: "Prescription",
      },
    },
  ],

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },

  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalSaving: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingFee: {
    type: Number,
    default: 0,
    required: true,
  },
  amountToBePaid: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", productSchema);
