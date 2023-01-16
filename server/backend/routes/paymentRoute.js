// const express = require("express");
// const router = express.Router();
// const { isAuthenticated } = require("../middleware/auth");
// const {
//   processPayment,
//   sendStripeApiKey,
// } = require("../controllers/paymentController");
// router.route("/payment/process").post(isAuthenticated, processPayment);

// router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

// module.exports = router;

const express = require("express");
const {
  checkout,
  paymentVerification,
  webhookCapture,
  genrateInvoice,
  getInvoice,
  getKey,
} = require("../controllers/paymentController.js");
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");

const router = express.Router();
router.route("/getkey").get(getKey);
router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/webhook").post(webhookCapture);
router.route("/invoice").post(genrateInvoice);
router.route("/getinvoice").get(getInvoice);

module.exports = router;
