const scraper = require('../services/scraper');
const cacheService = require('../services/cacheService');
const { validateGST, validateCompanyName, sanitizeInput } = require('../services/validation');

exports.searchCompany = async (req, res) => {
  try {
    let { gstNumber, companyName } = req.body;

    if (!gstNumber && !companyName) {
      return res.status(400).json({ 
        error: 'Please provide GST number or company name',
        status: 'error'
      });
    }

    // Validate and sanitize inputs
    if (gstNumber) {
      gstNumber = sanitizeInput(gstNumber).toUpperCase();
      if (!validateGST(gstNumber)) {
        return res.status(400).json({ 
          error: 'Invalid GST number format. Expected format: 27AAFCT5055K1Z0',
          status: 'error'
        });
      }
    }

    if (companyName) {
      companyName = sanitizeInput(companyName);
      if (!validateCompanyName(companyName)) {
        return res.status(400).json({ 
          error: 'Company name must be between 2 and 100 characters',
          status: 'error'
        });
      }
    }

    // Check cache
    const cacheKey = `company_${gstNumber || companyName}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({ 
        data: cachedData, 
        source: 'cache',
        status: 'success',
        message: 'Data fetched from cache'
      });
    }

    // Fetch data
    const companyDetails = await scraper.fetchCompanyDetails(gstNumber, companyName);

    // Cache result
    cacheService.set(cacheKey, companyDetails);

    res.json({ 
      data: companyDetails, 
      source: 'fetched',
      status: 'success',
      message: 'Company details fetched successfully'
    });
  } catch (error) {
    console.error('Error in searchCompany:', error);
    res.status(500).json({ 
      error: 'Failed to fetch company details. Please try again later.',
      details: error.message,
      status: 'error'
    });
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    let { gstNumber } = req.params;

    if (!gstNumber) {
      return res.status(400).json({ 
        error: 'GST number is required',
        status: 'error'
      });
    }

    gstNumber = sanitizeInput(gstNumber).toUpperCase();
    
    if (!validateGST(gstNumber)) {
      return res.status(400).json({ 
        error: 'Invalid GST number format',
        status: 'error'
      });
    }

    const cacheKey = `company_${gstNumber}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({ 
        data: cachedData, 
        source: 'cache',
        status: 'success'
      });
    }

    const companyDetails = await scraper.fetchCompanyDetails(gstNumber, null);
    cacheService.set(cacheKey, companyDetails);

    res.json({ 
      data: companyDetails, 
      source: 'fetched',
      status: 'success'
    });
  } catch (error) {
    console.error('Error in getCompanyDetails:', error);
    res.status(500).json({ 
      error: 'Failed to fetch company details',
      details: error.message,
      status: 'error'
    });
  }
};
