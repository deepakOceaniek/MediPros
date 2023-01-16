const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    ordersBy,
    orderItems,
    paymentInfo,
    totalPrice,
    totalSaving,
    shippingFee,
    amountToBePaid,
  } = req.body;

  console.log(`req.body ${req.body}`);
  console.log(req.body);

  const order = await Order.create({
    ordersBy,
    orderItems,
    paymentInfo,
    totalPrice,
    totalSaving,
    shippingFee,
    amountToBePaid,
    paidAt: Date.now(),
    user: req.user._id,
  });
  console.log(`order${order}`);

  res.status(201).json({
    success: true,
    order,
  });
});

//Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const query = [
    // {
    //   path: "orderItems.product",
    //   select: "name price images discount",
    // },
    {
      path: "user",
      select: "defaultAddress",
      strictPopulate: false,
    },
    // {
    //   path: "orderItems.prescription",
    //   select: "images status",
    //   strictPopulate: false,
    // },
  ];

  const order = await Order.findById(req.params.id).populate(query);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  console.log(order);
  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user All Order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const query = [
    {
      path: "user",
      select: "defaultAddress",
      strictPopulate: false,
    },
    // {
    //   path: "orderItems.product",
    //   select: "name price images discount",
    // },
  ];

  let orders = await Order.find({ user: req.user._id }).populate(query);
  // let newOrders = [];

//   for (let order of orders) {
//     let newProducts = [];
//     for (let item of order.orderItems) {
//       item = {
//         product: item.product._id,
//         name: item.product.name,
//         price: item.product.price,
//         images: item.product.images,
//         quantity: item.quantity,
//         discount: item.product.discount,
//       };
//       connsole.log(item)
//       newProducts.push(item);
//     }
//     order.orderItems= newProducts
//     newOrders.push(order)
//   }
// orders = newOrders

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get All Orders --admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Get Single Order --admin
exports.orderDetailsAdmin = catchAsyncErrors(async (req, res, next) => {
  const query = [
    {
      path: "user",
      select: "defaultAddress",
      strictPopulate: false,
    },
  
    {
      path: "orderItems.prescription",
      select: "images status",
      strictPopulate: false,
    },
  ];
  const order = await Order.findById(req.params.id).populate(query);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Delete Order --admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
