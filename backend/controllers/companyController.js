const scraper = require('../services/scraper');
const cacheService = require('../services/cacheService');

exports.searchCompany = async (req, res) => {
  try {
    const { gstNumber, companyName } = req.body;

    if (!gstNumber && !companyName) {
      return res.status(400).json({ error: 'Please provide GST number or company name' });
    }

    // Check cache
    const cacheKey = `company_${gstNumber || companyName}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({ data: cachedData, source: 'cache' });
    }

    // Fetch data
    const companyDetails = await scraper.fetchCompanyDetails(gstNumber, companyName);

    // Cache result
    cacheService.set(cacheKey, companyDetails);

    res.json({ data: companyDetails, source: 'fetched' });
  } catch (error) {
    console.error('Error in searchCompany:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    const { gstNumber } = req.params;

    const cacheKey = `company_${gstNumber}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({ data: cachedData, source: 'cache' });
    }

    const companyDetails = await scraper.fetchCompanyDetails(gstNumber, null);
    cacheService.set(cacheKey, companyDetails);

    res.json({ data: companyDetails, source: 'fetched' });
  } catch (error) {
    console.error('Error in getCompanyDetails:', error);
    res.status(500).json({ error: error.message });
  }
};
