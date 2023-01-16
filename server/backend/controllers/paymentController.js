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
  console.log(options);
  const order = await instance.orders.create(options);
  console.log(order);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(req.query);
  console.log(req.query.id);
  console.log(`Header${JSON.stringify(req.headers)}`);
  console.log(`body${JSON.stringify(req.body)}`);
  // const { cookie } = req.headers;
  // const token = cookie.split("=")[1];
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTljOGUzMGRiNjRjNjYzMmU3OWRiYiIsImlhdCI6MTY3MzI1ODMyMywiZXhwIjoxNjczODYzMTIzfQ.6AAlYsl0TaAHAVR-6uEAQEkyqjiz9yDzNquR22j18wY";
  // console.log(`Token ${token}`);
  const userId = req.query.id;

  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(`decodedData ${JSON.stringify(decodedData)}`);
  // req.user = await User.findById(decodedData.id);
  // console.log(`reqUser ${req.user}`);
  // const userId = req.user.id;
  // console.log(`Body${JSON.stringify(req.body)}`);
  // console.log(`PaymentUserId ${userId}`);
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  console.log(`${expectedSignature}-----------------${razorpay_signature}`);

  if (isAuthentic) {
    const payment = await Payment.find();
    console.log(payment.razorpay_payment_id !== razorpay_payment_id);
    if (payment.razorpay_payment_id !== razorpay_payment_id) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
    }
    // TODO : check payment is success dataBase
    // await Payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });

    // console.log(`reqUser ${req.user}`);

    // console.log(`UserId ${req.user.id}`);
    // const query = [
    //   {
    //     path: "user",
    //     select: "defaultAddress",
    //   },
    //   {
    //     path: "products.productId",
    //     select: "images name price discount",
    //   },
    // ];
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
      ordersBy: "pharmacy",
      orderItems: products,
      paymentInfo: { id: razorpay_payment_id, status: "succeeded" },
      totalPrice,
      totalSaving,
      shippingFee,
      amountToBePaid,
      paidAt: Date.now(),
      user: userId,
    });
    console.log(`order ${order}`)
    cart.remove(); //Todo uncomment later
    res.status(200).json({
      success: "ok",
    });
    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

exports.webhookCapture = catchAsyncErrors(async (req, res, next) => {
  if (req.body.event == "payment.captured") {
    const { id, order_id } = req.body.payload.payment.entity;
    const razorpay_order_id = order_id;
    const razorpay_payment_id = id;
    const razorpay_signature = req.headers["x-razorpay-signature"];

    // console.log(razorpay_payment_id);
    console.log(req.body);
    console.log(req.body.payload);

    const isAuthentic = validateWebhookSignature(
      JSON.stringify(req.body),
      razorpay_signature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    console.log(isAuthentic);

    if (isAuthentic) {
      const payment = await Payment.find();
      console.log(payment.razorpay_payment_id !== razorpay_payment_id);
      if (payment.razorpay_payment_id !== razorpay_payment_id) {
        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
      }

      // TODO : check payment is success dataBase
      // await Payment.create({
      //   razorpay_order_id,
      //   razorpay_payment_id,
      //   razorpay_signature,
      // });
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

exports.genrateInvoice = catchAsyncErrors(async (req, res, next) => {
  const options = {
    type: "invoice",
    description: "Domestic invoice for Gaurav Kumar.",
    partial_payment: true,
    customer: {
      name: "Deepak Singh",
      contact: "9876543210",
      email: "deepak@oceaniek.com",
      billing_address: {
        line1: "Ground FLoor, Millennium Tower, 1st Avenue",
        line2: "1st Avenue",
        zipcode: "560001",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
      shipping_address: {
        line1: "3rd FLoor, Nakamura Tower, Bomaye Boulevard",
        line2: "Baker Street",
        zipcode: "560001",
        city: "Bangalore",
        state: "Karnataka",
        country: "in",
      },
    },
    line_items: [
      {
        name: "Crate of sea weed",
        description: "Crate of sea weed.",
        amount: 20000,
        currency: "INR",
        quantity: 1,
      },
      {
        item_id: "item_KxkrmU4kcFch7E",
      },
    ],
    sms_notify: 1,
    email_notify: 1,
    draft: "1",
    date: 1588076279,
    expire_by: 1924991999,
    receipt: "Receipt No. 1",
    comment: "Fresh sea weed mowed this morning",
    terms: "No Returns; No Refunds",
    notes: {
      notes_key_1: "Tea, Earl Grey, Hot",
      notes_key_2: "Tea, Earl Grey… decaf.",
    },
  };
  const invoice = await instance.invoices.create(options);
  console.log(invoice);

  res.status(200).json({
    success: true,
    invoice,
  });
});

exports.getInvoice = catchAsyncErrors(async (req, res, next) => {
  // const invoiceId = req.params.id;
  const type = req.queery.type;

  // const invoice = instance.invoices.fetch(invoiceId);
  const invoice = instance.invoices.all();

  res.status(200).json({
    success: true,
    invoice,
  });
});
