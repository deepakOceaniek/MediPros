const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  optVerify,
  registerAdmin,
  getAdminDetails,
  updateAdminProfile,
  getAllAddress,
  getAddressDetails,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  addPrescription,
  getAddressDefault,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");

router.route("/login").get(loginUser);
router.route("/verify").post(optVerify);

router.route("/register").get(registerUser);
router.route("/admin/register").get(registerAdmin);
router.route("/logout").get(logout);


router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/address").get(isAuthenticated, getAllAddress);
router.route("/address").post(isAuthenticated, addUserAddress);
router.route("/defaultAddress/:id").put(isAuthenticated,getAddressDefault)
router
  .route("/address/:id")
  .get(isAuthenticated, getAddressDetails)
  .put(isAuthenticated, updateUserAddress)
  .delete(isAuthenticated, deleteUserAddress)
  

router
  .route("/admin/me")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminDetails);
router
  .route("/admin/me/update")
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateAdminProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteUser);
module.exports = router;
