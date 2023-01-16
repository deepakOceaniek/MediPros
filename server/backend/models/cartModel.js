const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    // orderBy: { type: String, required: true },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
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
      },
    ],
    totalPrice: { type: Number },
    totalSaving: { type: Number },
    shippingFee: { type: Number },
    amountToBePaid: { type: Number },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
