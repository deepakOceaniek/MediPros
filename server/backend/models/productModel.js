const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please Enter Product description"],
  },
  price: {
    type: Number,
    required: [true, "please Enter Product Price"],
    maxLength: [8, "Price can not exceed 8 character"],
  },
  type: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  salt: {
    type: String,
    required: [true, "please Enter Product Salt"],
  },
  expired: {
    type: Date,
    required: [true, "please Enter Expiry date"],
  },

  productQuantity: {
    type: Number,
    required: [true, "please Enter tablet per strip"],
  },

  company: {
    type: String,
    required: [true, "please Enter Company"],
  },
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

  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  discount: { type: Number, default: 0 },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  gst: {
    type: String,
    required: [true, "please Enter GST"],
  },

  batchCode: {
    type: String,
    required: [true, "please Enter Batch Code"],
  },

  hsnCode: { type: String, required: [true, "please Enter HSN Code"] },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
