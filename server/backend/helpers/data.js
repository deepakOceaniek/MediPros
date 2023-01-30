// const catchAsyncErrors = require("../middleware/catchAsyncError");
// const Order = require("../models/orderModel");

// module.exports.orderDataForInvoice = catchAsyncErrors(
//   async (req, res, next) => {
//     const query = [
//       {
//         path: "user",
//         select: "defaultAddress",
//         strictPopulate: false,
//       },
//     ];

//     const order = await Order.findById(req.params.id).populate(query);
//     if (!order) {
//       return next(new ErrorHandler("Order not found with this Id", 404));
//     }
//     return order;
//   }
// );

// module.exports = [
//   {
//     name: "Product 1",
//     unit: "pack",
//     quantity: 2,
//     price: 20,
//     imgurl:
//       "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp",
//   },
//   {
//     name: "Product 2",
//     unit: "pack",
//     quantity: 4,
//     price: 80,
//     imgurl:
//       "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp",
//   },
//   {
//     name: "Product 3",
//     unit: "pack",
//     quantity: 3,
//     price: 60,
//     imgurl:
//       "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp",
//   },
// ];
