const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  orderDetailsAdmin,
} = require("../controllers/orderControllers");

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), orderDetailsAdmin)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteOrder);

module.exports = router;
