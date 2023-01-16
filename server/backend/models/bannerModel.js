const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({


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
});
module.exports = mongoose.model("Banner", bannerSchema);
