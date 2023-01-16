const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");
const {
  createTest,
  getAllTest,
  getAdminTest,
  getTestDetails,
  updateTest,
  deleteTest,
  createPackage,
  getAllPackage,
  getAdminPackage,
  getPackageDetails,
  updatePackage,
  deletePackage,
  createPackageReview,
  getAllPackageReviews,
  deletePackageReview,
  getAllLabCategory,
  addLabCategory,
  getLabCategoryDetails,
  updateLabCategory,
  deleteLabCategory,
  getAdminTestDetails,
  getAdminPackageDetails,
  getAdminAllLabCategory,
  getAdminSample,
  addSample,
  getSampleDetails,
  updateSample,
  deleteSample,
} = require("../controllers/testController");

//Test --user
router.route("/test").get(isAuthenticated, getAllTest);
router.route("/test/:id").get(isAuthenticated, getTestDetails);
//Test --admin
router
  .route("/admin/test/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), createTest);
router
  .route("/admin/tests")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminTest);
router
  .route("/admin/test/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminTestDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateTest)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteTest);

//Package --user
router.route("/package").get(isAuthenticated, getAllPackage);
router.route("/package/:id").get(isAuthenticated, getPackageDetails);
//Package --admin
router
  .route("/admin/package/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), createPackage);
router
  .route("/admin/package")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminPackage);
router
  .route("/admin/package/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminPackageDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updatePackage)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deletePackage);

//Test Package reviews
router.route("/packagereview").put(isAuthenticated, createPackageReview);
router
  .route("/testreviews")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllPackageReviews)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deletePackageReview);

//Lab category --user
router.route("/labcategory").get(isAuthenticated, getAllLabCategory);
//Lab category --admin
router
  .route("/admin/labcategory")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminAllLabCategory);
router
  .route("/admin/labcategory/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), addLabCategory);
router
  .route("/admin/labcategory/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getLabCategoryDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateLabCategory)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteLabCategory);

  router.route("/admin/sample").get(getAdminSample)
  router.route("/admin/sample/new").post(addSample)
  router.route("/admin/sample/:id")
  .get(getSampleDetails)
.put(updateSample)
.delete(deleteSample)
module.exports = router;
