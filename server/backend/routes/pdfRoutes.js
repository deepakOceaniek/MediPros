const express = require('express');
const {homeview, generatePdf}  = require('../controllers/pdfController');

const router = express.Router();

router.get('/genratepdf', homeview);
router.get('/download', generatePdf);

module.exports = router;