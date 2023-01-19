const catchAsyncErrors = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.getKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

exports.checkout = catchAsyncErrors(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  // console.log(options);
  const order = await instance.orders.create(options);
  await Payment.create({
    razorpay_order_id: order.id,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   // console.log(req.query);
//   // console.log(req.query.id);
//   // console.log(`Header${JSON.stringify(req.headers)}`);
//   // console.log(`body${JSON.stringify(req.body)}`);
//   // const { cookie } = req.headers;
//   // const token = cookie.split("=")[1];
//   // const token =
//   //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTljOGUzMGRiNjRjNjYzMmU3OWRiYiIsImlhdCI6MTY3MzI1ODMyMywiZXhwIjoxNjczODYzMTIzfQ.6AAlYsl0TaAHAVR-6uEAQEkyqjiz9yDzNquR22j18wY";
//   // console.log(`Token ${token}`);
//   const userId = req.query.id;

//   // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//   // console.log(`decodedData ${JSON.stringify(decodedData)}`);
//   // req.user = await User.findById(decodedData.id);
//   // console.log(`reqUser ${req.user}`);
//   // const userId = req.user.id;
//   // console.log(`Body${JSON.stringify(req.body)}`);
//   // console.log(`PaymentUserId ${userId}`);
//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   // console.log(`${expectedSignature}-----------------${razorpay_signature}`);

//   if (isAuthentic) {
//     const payment = await Payment.find();
//     // console.log(payment.razorpay_payment_id !== razorpay_payment_id);
//     if (payment.razorpay_payment_id !== razorpay_payment_id) {
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });
//     }
//     // TODO : check payment is success dataBase
//     // await Payment.create({
//     //   razorpay_order_id,
//     //   razorpay_payment_id,
//     //   razorpay_signature,
//     // });

//     // console.log(`reqUser ${req.user}`);

//     // console.log(`UserId ${req.user.id}`);
//     // const query = [
//     //   {
//     //     path: "user",
//     //     select: "defaultAddress",
//     //   },
//     //   {
//     //     path: "products.productId",
//     //     select: "images name price discount",
//     //   },
//     // ];
//     let cart = await Cart.findOne({ user: userId });
//     // .populate(query);
//     // console.log(`cart ${cart}`);

//     const {
//       user,
//       products,
//       totalPrice,
//       totalSaving,
//       shippingFee,
//       amountToBePaid,
//     } = cart;
//     // console.log(`user ${user}`);

//     const order = await Order.create({
//       ordersBy: "pharmacy",
//       orderItems: products,
//       paymentInfo: { id: razorpay_payment_id, status: "succeeded" },
//       totalPrice,
//       totalSaving,
//       shippingFee,
//       amountToBePaid,
//       paidAt: Date.now(),
//       user: userId,
//     });
//     // console.log(`order ${order}`)
//     cart.remove(); //Todo uncomment later
//     res.status(200).json({
//       success: "ok",
//     });
//     // res.redirect(
//     //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//     // );
//   } else {
//     res.status(400).json({
//       success: false,
//     });
//   }
// });

exports.webhookCapture = catchAsyncErrors(async (req, res, next) => {
  if (req.body.event == "payment.captured") {
    const { id, order_id, status } = req.body.payload.payment.entity;
    const razorpay_order_id = order_id;
    const razorpay_payment_id = id;
    const razorpay_signature = req.headers["x-razorpay-signature"];

    // console.log(razorpay_payment_id);
    // console.log(` BODY ${JSON.stringify(req.body)}`);
    // console.log(` Header ${JSON.stringify(req.headers)}`);
    // console.log(`Payload ${JSON.stringify(req.body.payload)}`);

    const isAuthentic = validateWebhookSignature(
      JSON.stringify(req.body),
      razorpay_signature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    // console.log(isAuthentic);

    if (isAuthentic) {
      const payment = await Payment.findOne({ razorpay_order_id }).populate(
        "user",
        "id"
      );
      // console.log(`payment ${payment}`)
      console.log(order_id === payment.razorpay_order_id);

      if (order_id === payment.razorpay_order_id) {
        console.log(`status ${status}`);
        console.log(`status ${razorpay_payment_id}`);
        console.log(`status ${razorpay_signature}`);
        (payment.status = status),
          (payment.razorpay_payment_id = razorpay_payment_id);
        payment.razorpay_signature = razorpay_signature;

        payment.save();
      }
      // console.log(payment.user)
      // console.log(payment.user.id)
      const userId = payment.user.id;

      let cart = await Cart.findOne({ user: userId });
      // .populate(query);
      console.log(`cart ${cart}`);

      const {
        user,
        products,
        totalPrice,
        totalSaving,
        shippingFee,
        amountToBePaid,
      } = cart;
      // console.log(`user ${user}`);

      const order = await Order.create({
        ordersFor: "Pharmacy",
        orderItems: products,
        paymentInfo: { id: razorpay_payment_id, status: "succeeded" },
        totalPrice,
        totalSaving,
        shippingFee,
        amountToBePaid,
        paidAt: Date.now(),
        user: userId,
      });
      console.log(`order ${order}`);
      cart.remove(); //Todo uncomment later
      res.status(200).json({
        success: "ok",
      });
    } else {
      res.status(400).json({
        success: false,
      });
    }
  }
});
