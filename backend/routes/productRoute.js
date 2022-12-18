const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");
const {
  getAllProduct,
  getAllCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteReview,
  getAdminProducts,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
  addPrescription,
  getPrescriptionDetails,
  getAllPrescription,
  getAllBanner,
  addBanner,
  deleteBanner,
} = require("../controllers/productController");

router.route("/products").get(isAuthenticated, getAllProduct);
router.route("/admin/products").get(isAuthenticatedAdmin, getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getProductDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(isAuthenticated, getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllProductReviews)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteReview);

router.route("/allbanner").get(isAuthenticated, getAllBanner);
router
  .route("/admin/banner/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), addBanner);

router
  .route("/admin/banner/:id")
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteBanner);

router.route("/allprescription").get(getAllPrescription);
router
  .route("/admin/prescription/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), addPrescription); // change Auth to user later
router
  .route("/admin/prescription/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getPrescriptionDetails);

router.route("/allcategory").get(isAuthenticated, getAllCategory);
router
  .route("/admin/category/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), addCategory);
router
  .route("/admin/category/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getCategoryDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteCategory);

module.exports = router;
