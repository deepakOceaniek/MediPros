const mongoose = require("mongoose");

const packageTestSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Package Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please Enter Package description"],
  },
  price: {
    type: Number,
    required: [true, "please Enter Package Price"],
    maxLength: [8, "Price can not exceed 8 character"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  verify: {
    type: String,
    required: true,
  },

  // tests: [
  //   {
  //     test: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "Test",
  //       required: true,
  //     },
  //   },
  // ],

  tests: {
    type: String,
    required: true,
  },

  numOfTest: {
    type: Number,
    default: 0,
  },

  testTiming: {
    type: String,
    required: [true, "please Enter  Test Timing"],
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

  // samples: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Sample",
  //   required: true,
  // },

  sample: {
    type: String,
    required: [true, "please Enter Sample description"],
  },

  report: {
    type: String,
    default: 1,
  },
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

module.exports = mongoose.model("Package", packageTestSchema);
