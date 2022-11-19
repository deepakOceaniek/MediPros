const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong  Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid :${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.code === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try agian`;
    err = new ErrorHandler(message, 400);
  }

  //  JWT Expire error
  if (err.code === "JsonWebTokenError") {
    const message = `Json Web Token is Expired, try agian`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message, //-->   "message": "Product not found"
    // error: err, //  ----> it  give error like this {
    //     "success": false,
    //     "error": {
    //         "statusCode": 404
    //     }
    // }
    // error: err.stack, // ----> it  give error like this    "Error: Product not found\n    at exports.getProductDetails (D:\\OFC\\new\\backend\\controllers\\productController.js:19:17)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
  });
};
