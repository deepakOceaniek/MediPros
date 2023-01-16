const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
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
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  gender: {
    type: String,
  },

  age: {
    type: Number,
  },

  bloodGroup: {
    type: String,
  },

  defaultAddress: {
    type: Object,
  },

  userAddresses: [
    {
      // user: {
      //   type: mongoose.Schema.ObjectId,
      //   ref: "User",
      //   required: true,
      // },

      // isdefault:{
      //   type:Boolean,
      //   default:false
      // },
      name: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      contact: {
        type: Number,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
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

// JWT TOKEN
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// userSchema.pre('save', function (next) {
//   this.userAddresses = this.get('_id'); // considering _id is input by client
//   next();
// });

userSchema.methods.getJWTToken = function () {
  let newGenrateToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.token = newGenrateToken;
  this.save();
  return newGenrateToken;
};

// store address
userSchema.methods.addMessage = async function (
  name,
  address,
  city,
  area,
  state,
  pinCode,
  contact
) {
  try {
    console.log("message called");

    this.userAddresses = this.userAddresses.concat({
      name,
      address,
      city,
      area,
      state,
      pinCode,
      contact,
    });
    await this.save();
    return this.userAddresses;
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.makeDefault = async function (address) {
  try {
    this.defaultAddress = address;
    await this.save();
    // return this.defaultAddress;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);
