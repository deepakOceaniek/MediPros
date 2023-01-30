const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  testOne: {
    type: mongoose.Schema.ObjectId,
    ref: "Test",
    required: true,
  },
  testTwo: {
    type: mongoose.Schema.ObjectId,
    ref: "Test",
  },
  testThird: {
    type: mongoose.Schema.ObjectId,
    ref: "Test",
  },
  testForth: {
    type: mongoose.Schema.ObjectId,
    ref: "Test",
  },

  sample: {
    type: mongoose.Schema.ObjectId,
    ref: "Sample",
    required: true,
  },
  sampleDrownDate: {
    type: Date,
    required: true,
  },
  SampleReceived: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  ReportPrintedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
