const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
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
    ref: "LabCategory",
    required: true,
  },

  packageTest: {
    type: mongoose.Schema.ObjectId,
    ref: "Package",
    required: true,
  },
  // samples: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Sample",
  //   required: true,
  // },

  sample: {
    type: String,
    required: [true, "please Enter Sample description"],
  },

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

module.exports = mongoose.model("Test", testSchema);
