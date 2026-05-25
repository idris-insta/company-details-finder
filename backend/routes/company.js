const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/search', companyController.searchCompany);
router.get('/details/:gstNumber', companyController.getCompanyDetails);

module.exports = router;
