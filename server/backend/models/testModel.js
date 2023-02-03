const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Test Name"],
    trim: true,
  },

  referenceRange: {
    type: String,
    required: true,
  },

  // subTest: [
  //   {
  //     name: {
  //       type: String,
  //     },
  //     value: {
  //       type: Number,
  //     },
  //     referenceRange: {
  //       type: String,
  //     },
  //   },
  // ],

  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  // category: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "LabCategory",
  //   required: true,
  // },

  // sample: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Sample",
  //   required: true,
  // },

  // sample: {
  //   type: String,
  //   required: [true, "please Enter Sample description"],
  // },
  // discount: { type: Number, default: 0 },

  // referenceRange: {
  //   type: String,
  //   required: true,
  // },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    default: "Test",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Test", testSchema);
