const fs = require("fs");
const pdf = require("pdf-creator-node");
const path = require("path");
const { invoice, report } = require("../helpers/options");
const data = require("../helpers/data");
const Order = require("../models/orderModel");
const Report = require("../models/ReportModel");

exports.homeview = (req, res, next) => {
  res.render("home");
};

exports.generateAndDownloadPdf = async (req, res, next) => {
  const html = fs.readFileSync(
    path.join(__dirname, "../views/template.html"),
    "utf-8"
  );
  const filename = Math.random() + "_doc" + ".pdf";

  const query = [
    {
      path: "user",
      select: "defaultAddress",
      strictPopulate: false,
    },
  ];
  const orderId = "63ce2c066f5644dc5337605d";

  const order = await Order.findById(orderId).populate(query);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  //   console.log(order);
  let array = [];

  order.orderItems.forEach((p) => {
    console.log(p.name);
    console.log(p.quantity);
    console.log(p.images);
    const prod = {
      name: p.name,
      quantity: p.quantity,
      price: p.price,
      imgurl: p.images[0].url,
    };
    array.push(prod);
  });

  const customerName = order.user.defaultAddress[0].name;
  const address = `${order.user.defaultAddress[0].address},${order.user.defaultAddress[0].city},${order.user.defaultAddress[0].area},${order.user.defaultAddress[0].state},${order.user.defaultAddress[0].state},${order.user.defaultAddress[0].pinCode} `;
  const totalPrice = order.totalPrice;
  const totalSaving = order.totalSaving;
  const shippingFee = order.shippingFee;
  const amountToBePaid = order.amountToBePaid;
  const date = order.createdAt.toLocaleString("en-GB");
  const obj = {
    prodlist: array,
    totalPrice: totalPrice,
    totalSaving: totalSaving,
    shippingFee: shippingFee,
    amountToBePaid: amountToBePaid,
    date: date,
    customerName: customerName,
    address: address,
  };

  const document = {
    html: html,
    data: {
      products: obj,
    },
    path: "./backend/docs/" + filename,
  };
  pdf
    .create(document, invoice)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  const filepath = "http://localhost:4000/docs/" + filename;

  res.render("download", {
    path: filepath,
  });

  // let array = [];

  // data.forEach(d => {
  //     const prod = {
  //         name: d.name,
  //         unit: d.unit,
  //         quantity: d.quantity,
  //         price: d.price,
  //         total: d.quantity * d.price,
  //         imgurl: d.imgurl
  //     }
  //     array.push(prod);
  // });

  // let subtotal = 0;
  // array.forEach(i => {
  //     subtotal += i.total
  // });
  // const tax = (subtotal * 20) / 100;
  // const grandtotal = subtotal - tax;
  // const obj = {
  //     prodlist: array,
  //     subtotal: subtotal,
  //     tax: tax,
  //     gtotal: grandtotal
  // }
  // const document = {
  //     html: html,
  //     data: {
  //         products: obj
  //     },
  //     path: './backend/docs/' + filename
  // }
  // pdf.create(document, options)
  //     .then(res => {
  //         console.log(res);
  //     }).catch(error => {
  //         console.log(error);
  //     });
  //     const filepath = 'http://localhost:4000/docs/' + filename;

  //     res.render('download', {
  //         path: filepath
  //     });
};

exports.homeviewlab = (req, res, next) => {
  res.render("reportHome");
};

exports.generateAndDownloadReport = async (req, res, next) => {
  const html = fs.readFileSync(
    path.join(__dirname, "../views/reportTemplate.html"),
    "utf-8"
  );
  const filename = Math.random() + "_doc" + ".pdf";

  const query = [
    {
      path: "user",
      select: "defaultAddress",
      strictPopulate: false,
    },
  ];
  const orderId = "63ce2c066f5644dc5337605d";

  const order = await Order.findById(orderId).populate(query);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  //   console.log(order);
  let array = [];

  order.orderItems.forEach((p) => {
    const prod = {
      name: p.name,
      quantity: p.quantity,
      price: p.price,
      imgurl: p.images[0].url,
    };
    array.push(prod);
  });

  const customerName = order.user.defaultAddress[0].name;
  const address = `${order.user.defaultAddress[0].address},${order.user.defaultAddress[0].city},${order.user.defaultAddress[0].area},${order.user.defaultAddress[0].state},${order.user.defaultAddress[0].state},${order.user.defaultAddress[0].pinCode} `;
  const totalPrice = order.totalPrice;
  const totalSaving = order.totalSaving;
  const shippingFee = order.shippingFee;
  const amountToBePaid = order.amountToBePaid;
  const date = order.createdAt.toLocaleString("en-GB");
  const obj = {
    prodlist: array,
    totalPrice: totalPrice,
    totalSaving: totalSaving,
    shippingFee: shippingFee,
    amountToBePaid: amountToBePaid,
    date: date,
    customerName: customerName,
    address: address,
  };

  const document = {
    html: html,
    data: {
      products: obj,
    },
    path: "./backend/docs/" + filename,
  };
  pdf
    .create(document, report)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  const filepath = "http://localhost:4000/docs/" + filename;

  res.render("download", {
    path: filepath,
  });
};
exports.reportDataAdd = async (req, res, next) => {
  const report = await Report.create(req.body);
  res.status(201).json({
    success: true,
  });
};

exports.getReportData = async (req, res, next) => {
  const report = await Report.findOne({ user: userId });
  // TODO: Method-2 if first not work
  // const report = await Report.findById(id);
  res.status(201).json({
    success: true,
    report,
  });
};
