const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "please Enter Category name"],
 
  },

  categoryImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});
module.exports = mongoose.model("Category", categorySchema);
