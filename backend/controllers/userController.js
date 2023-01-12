const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Prescription = require("../models/prescriptionModel");
const Banner = require("../models/bannerModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

//Register Admin
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  // console.log(contact);
  // console.log(req.query.sms);
  // console.log(req.files);
  const contact = req.query.contact;
  // const { category, name, contact, address, fromTime, toTime, status } =
  // req.body;

  const adminExist = await Admin.findOne({ contact: contact });

  if (adminExist) {
    return next(new ErrorHandler("Already registered", 409));
  } else {
    const optreq = await client.verify
      .services(process.env.SERVICEID)
      .verifications.create({
        to: `+${contact}`,
        channel: req.query.channel,
      });
    if (optreq) {
      res
        .status(200)
        .json({ status: optreq.status, statusCode: 200, message: "success" });
    }

    // const profileMyCloud = await cloudinary.v2.uploader.upload(
    //   req.body.profileImage,
    //   {
    //     folder: "profileImage",
    //     width: 150,
    //     crop: "scale",
    //   }
    // );
    // const certificateMyCloud = await cloudinary.v2.uploader.upload(
    //   req.body.certificateImage,
    //   {
    //     folder: "certificateImage",
    //     width: 150,
    //     crop: "scale",
    //   }
    // );

    // const admin = await Admin.create({
    //   category,
    //   name,
    //   contact,
    //   address,
    //   profileImage: {
    //     public_id: profileMyCloud.public_id,
    //     url: profileMyCloud.secure_url,
    //   },
    //   certificateImage: {
    //     public_id: certificateMyCloud.public_id,
    //     url: certificateMyCloud.secure_url,
    //   },
    //   fromTime,
    //   toTime,
    //   status,
    // });
    // // sendToken(admin, 201, res);
    // res.status(201).json({ success: true, message: "Register Successful" });
  }
});

//Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const contact = req.params.phonenumber;
  // const name = req.params.name
  // if (!name || !contact || contact.toString().length !== 12) {
  //   return next(new ErrorHandler("Please fill the all Entries Properly", 400));
  // }
  // console.log(req.body);
  // console.log(req.query.contact);
  // console.log(req.query.channel);

  const userExist = await User.findOne({ contact: req.query.contact });
  // console.log(userExist);
  if (userExist) {
    return next(new ErrorHandler("Already registered", 409));
  } else {
    const optreq = await client.verify
      .services(process.env.SERVICEID)
      .verifications.create({
        to: `+${req.query.contact}`,
        channel: req.query.channel,
      });
    if (optreq) {
      // console.log(optreq)
      res
        .status(200)
        .json({ status: optreq.status, statusCode: 200, message: "success" });
    }
    // const user = await User.create({
    //   name,
    //   contact,
    // });
    // // sendToken(user, 201, res);
    // res.status(201).json({ success: true, message: "Register Successful" });
  }
});

//**  login phoneNumber and channel(sms/call) **
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const contact = req.query.contact;
  // console.log(req.query.contact);
  // console.log(req.query.channel);
  const user = await User.findOne({ contact });
  const admin = await Admin.findOne({ contact });

  if (user || admin) {
    const optreq = await client.verify
      .services(process.env.SERVICEID)
      .verifications.create({
        to: `+${req.query.contact}`,
        channel: req.query.channel,
      });
    if (optreq) {
      res
        .status(200)
        .json({ status: optreq.status, statusCode: 200, message: "success" });
    }
  } else {
    return next(new ErrorHandler("Please Register First", 401));
  }
});

//**  verify phonenumber and code**
exports.optVerify = catchAsyncErrors(async (req, res, next) => {
  // req.body.map((item) => {
  //   console.log(item);
  // });
  // console.log(`body ${req.body}`);
  // console.log(req.files);

  const { contact, code } = req.body;

  // let contact = req.query.phonenumber;
  const user = await User.findOne({ contact }).select("user._id")
  const admin = await Admin.findOne({ contact });
  // console.log(`User-----${user}`);
  // console.log(`Admin-----${admin}`);
  if (user || admin) {
    const verified = await client.verify
      .services(process.env.SERVICEID)
      .verificationChecks.create({
        to: `+${contact}`,
        code: code,
      });
    if (verified.status === "approved") {
      sendToken(user || admin, 200, res);
    } else {
      return next(new ErrorHandler("Verification Fail", 401));
    }
  } else if (!user || !admin) {
    const verified = await client.verify
      .services(process.env.SERVICEID)
      .verificationChecks.create({
        to: `+${contact}`,
        code: code,
      });
    if (verified.status === "approved") {
      const { name, category, address, fromTime, toTime, status } = req.body;

      if (name && contact && category) {
        const profileMyCloud = await cloudinary.v2.uploader.upload(
          req.body.profileImage,
          {
            folder: "profileImage",
            width: 150,
            crop: "scale",
          }
        );
        const certificateMyCloud = await cloudinary.v2.uploader.upload(
          req.body.certificateImage,
          {
            folder: "certificateImage",
            width: 150,
            crop: "scale",
          }
        );

        const admin = await Admin.create({
          category,
          name,
          contact,
          address,
          profileImage: {
            public_id: profileMyCloud.public_id,
            url: profileMyCloud.secure_url,
          },
          certificateImage: {
            public_id: certificateMyCloud.public_id,
            url: certificateMyCloud.secure_url,
          },
          fromTime,
          toTime,
          status,
        });
        sendToken(admin, 201, res);
      } else if (name && contact) {
        const user = await User.create({
          name,
          contact,
        });
        sendToken(user, 201, res);
      } else {
        return next(new ErrorHandler("Unprocessable Entity", 406));
      }
    }
  } else {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }
});

// Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Get User Details --User Own Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});
//Get User Details --User Own Details
exports.getAdminDetails = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user.id);
  const user = await Admin.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    contact: req.body.contact,
    email:  req.body.email,
    gender: req.body.gender,
    age:req.body.age,
    bloodGroup:req.body.bloodGroup
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // console.log(user);
  res.status(200).json({ success: true });
});

//Update Admin Profile
exports.updateAdminProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    category: req.body.category,
    name: req.body.name,
    contact: req.body.contact,
    address: req.body.address,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    status: req.body.status,
  };
  console.log(newUserData);
  console.log(`user id upper${req.user.id}`);
  console.log(`profileImage  file ${req.body.profileImage}`);
  console.log(`body ${req.body}`);
  console.log(`certificateImage  file ${req.body.certificateImage}`);

  // Cloudinary
  if (req.body.profileImage !== "" || req.body.profileImage !== undefined) {
    const user = await Admin.findById(req.user.id);
    const imageId = user.profileImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const profileMyCloud = await cloudinary.v2.uploader.upload(
      req.body.profileImage,
      {
        folder: "profileImage",
        width: 150,
        crop: "scale",
      }
    );

    newUserData.profileImage = {
      public_id: profileMyCloud.public_id,
      url: profileMyCloud.secure_url,
    };
  }
  if (
    req.body.certificateImage !== "" ||
    req.body.certificateImage !== undefined
  ) {
    const user = await Admin.findById(req.user.id);
    const imageId = user.certificateImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const certificateMyCloud = await cloudinary.v2.uploader.upload(
      req.body.certificateImage,
      {
        folder: "certificateImage",
        width: 150,
        crop: "scale",
      }
    );

    newUserData.certificateImage = {
      public_id: certificateMyCloud.public_id,
      url: certificateMyCloud.secure_url,
    };
  }
  console.log(`user id lower ${req.user.id}`);
  const user = await Admin.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(`profile Updated data ${user}`);
  res.status(200).json({ success: true });
});

// Get all Users (Admin Can Access)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User (Admin Can Access)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role  --admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // let user = User.findById(req.params.id);

  // if (!user) {
  //   return next(
  //     new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`, 400)
  //   );
  // }
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

//Delete User --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  // We will remove cloudinary later

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

// Get all user Address
exports.getAllAddress = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  userAddresses = user.userAddresses;
  res.status(200).json({
    success: true,
    userAddresses,
  });
});

// Add user Address
exports.addUserAddress = catchAsyncErrors(async (req, res, next) => {
  const { name, address, city, area, state, pinCode, contact } = req.body;
  console.log(req.body);
  if (!name || !address || !city || !area || !state || !pinCode || !contact) {
    res.status(400).json({ message: "please fill the Address details" });
  }
  const userDetails = await User.findOne({ _id: req.user.id });
  console.log(userDetails);
  if (userDetails) {
    const userAddress = await userDetails.addMessage(
      name,
      address,
      city,
      area,
      state,
      pinCode,
      contact
    );
    console.log(userAddress);
    await userDetails.save();
    res.status(201).json({ message: "Address Added " });
  }
});

// User Address Details
exports.getAddressDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  const address = user.userAddresses.filter((add) => {
    return add._id.toString() === req.params.id.toString();
  });

  if (address.length <= 0) {
    return next(new ErrorHandler("User address not found", 400));
  } else {
    res.status(200).json({
      success: true,
      address: address,
    });
  }
});
// status   code message

// Update user Address
exports.updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  const { address, city, area, state, pinCode, contact } = req.body;

  const userdetails = await User.findById(req.user.id);

  if (userdetails) {
    console.log(req.params.id.toString().length !== 24);
    if (req.params.id.toString().length !== 24) {
      return next(new ErrorHandler("Address not found", 400));
    } else {
      userdetails.userAddresses.forEach((add) => {
        if (add._id.toString() === req.params.id.toString())
          add.address = address;
        add.city = city;
        add.area = area;
        add.state = state;
        add.pinCode = pinCode;
        add.contact = contact;
      });
    }
  }
  await userdetails.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Address Updated",
  });
});

// Delete user Address
exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  let userAddresses;
  const userDetails = await User.findById(req.user.id);
  if (!userDetails) {
    return next(new ErrorHandler("User not found", 401));
  }

  if (req.params.id.toString().length !== 24) {
    return next(new ErrorHandler("Address not found", 400));
  } else {
    userAddresses = userDetails.userAddresses.filter((add) => {
      return add._id.toString() !== req.params.id.toString();
    });
  }
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { userAddresses },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    message: "Address Deleted",
  });
});

// Make User Address  Default
exports.getAddressDefault = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  const address = user.userAddresses.filter((add) => {
    return add._id.toString() === req.params.id.toString();
  });

  if (address.length <= 0) {
    return next(new ErrorHandler("User address not found", 400));
  } else {
    const defaultaddress = await user.makeDefault(address);
    res.status(200).json({
      success: true,
    });
  }
});

//Add prescription
exports.addPrescription = catchAsyncErrors(async (req, res, next) => {
  console.log(req.files);
  // Cloudinary
  if (req.files !== "") {
    const MyCloud = await cloudinary.v2.uploader.upload(
      req.body.prescriptionImage,
      {
        folder: "prescriptionImage",
        width: 150,
        crop: "scale",
      }
    );
    console.log(MyCloud);
    const prescription = await Prescription.create({
      prescriptionImage: {
        public_id: MyCloud.public_id,
        url: MyCloud.secure_url,
      },
    });
  } else {
    return next(
      new ErrorHandler("Please upload your prescription properly", 400)
    );
  }
  res
    .status(200)
    .json({ message: "Your Prescription was send to the nearest Pharmacy " });
});
