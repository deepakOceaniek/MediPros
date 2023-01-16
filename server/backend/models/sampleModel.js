const mongoose = require("mongoose");

const sampleSchema = mongoose.Schema({
  sampleCode: {
    type: String,
    required: [true, "please Enter Sample Code"],
    trim: true,
  },

  name: {
    type: String,
    required: [true, "please Enter Name "],
  },
});

module.exports = mongoose.model("Sample", sampleSchema);
