const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const adminSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters "],
    minLength: [4, "Name Should have more than 4 characters "],
  },
  contact: {
    type: Number,
    required: [true, "please Enter Your Contact Number"],
  },

  address: {
    type: String,
    required: [true, "please Enter Your Address"],
    maxLength: [50, "Address cannot exceed 30 characters "],
    minLength: [10, "Address Should have more than 4 characters "],
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  certificateImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  fromTime: { type: String, required: true },
  toTime: { type: String, required: true },

  status: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    // required: true,
  },

 
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// JWT TOKEN
// adminSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

adminSchema.methods.getJWTToken = function () {
  let newGenrateToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.token = newGenrateToken;
  this.save();
  return newGenrateToken;
};




module.exports = mongoose.model("Admin", adminSchema);
