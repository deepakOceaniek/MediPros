const express = require("express");
const {
  homeview,
  generateAndDownloadPdf,
  homeviewlab,
  generateAndDownloadReport,
  reportDataAdd,
  getReportData,
} = require("../controllers/pdfController");
const { isAuthenticated, isAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();

//Invoice
router.get("/genratepdf", homeview);
router.get("/download", generateAndDownloadPdf);

// TODO:
// Report
router.get("/genratepdfreport", homeviewlab);
router.get("/downloadlabreport", generateAndDownloadReport);
router
  .route("/reportData")
  .post(isAuthenticatedAdmin, reportDataAdd)
  .get(isAuthenticated, getReportData);

module.exports = router;
