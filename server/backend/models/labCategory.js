const mongoose = require("mongoose");

const labCategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "please Enter Category name"],
 
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
});
module.exports = mongoose.model("LabCategory", labCategorySchema);
