const axios = require('axios');
const cheerio = require('cheerio');

// Extract phone numbers from text
const fetchPhoneNumber = async (searchTerm) => {
  try {
    console.log(`[Phone Search] Fetching phone for: ${searchTerm}`);
    
    // Try multiple business directories
    const sources = [
      { name: 'ClinicSpots', url: `https://clinicspots.com/search?q=${encodeURIComponent(searchTerm)}` },
    ];

    for (const source of sources) {
      try {
        const response = await axios.get(source.url, { 
          timeout: 5000,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        
        const phones = extractPhones(response.data);
        if (phones.length > 0) {
          console.log(`[Phone] Found from ${source.name}: ${phones[0]}`);
          return phones[0];
        }
      } catch (e) {
        continue;
      }
    }

    return 'N/A';
  } catch (error) {
    console.error('[Phone Error]', error.message);
    return 'N/A';
  }
};

// Extract website from company data
const fetchWebsite = async (companyName) => {
  try {
    console.log(`[Website Search] Fetching website for: ${companyName}`);
    
    const commonTlds = ['com', 'in', 'co.in', 'org', 'net'];
    const cleanName = companyName.toLowerCase().replace(/\s+/g, '');

    for (const tld of commonTlds) {
      const possibleDomains = [
        `https://${cleanName}.${tld}`,
        `https://www.${cleanName}.${tld}`,
      ];

      for (const domain of possibleDomains) {
        try {
          const response = await axios.head(domain, { timeout: 3000 });
          if (response.status < 400) {
            console.log(`[Website] Found: ${domain}`);
            return domain;
          }
        } catch (e) {
          continue;
        }
      }
    }

    return 'N/A';
  } catch (error) {
    console.error('[Website Error]', error.message);
    return 'N/A';
  }
};

// Extract location/city from GST number
const fetchLocation = async (gstNumber, companyName) => {
  try {
    console.log(`[Location] Extracting from GST: ${gstNumber}`);
    
    const gstStateMap = {
      '01': 'Andaman and Nicobar Islands', '02': 'Andhra Pradesh', '03': 'Arunachal Pradesh',
      '04': 'Assam', '05': 'Bihar', '06': 'Chhattisgarh', '07': 'Chandigarh',
      '08': 'Dadra and Nagar Haveli', '09': 'Daman and Diu', '10': 'Delhi',
      '11': 'Daman and Diu', '12': 'Gujarat', '13': 'Himachal Pradesh',
      '14': 'Haryana', '15': 'Jharkhand', '16': 'Kashmir', '17': 'Karnataka',
      '18': 'Kerala', '19': 'Ladakh', '20': 'Lakshadweep', '21': 'Madhya Pradesh',
      '22': 'Maharashtra', '23': 'Manipur', '24': 'Meghalaya', '25': 'Mizoram',
      '26': 'Nagaland', '27': 'Odisha', '28': 'Puducherry', '29': 'Punjab',
      '30': 'Rajasthan', '31': 'Sikkim', '32': 'Tamil Nadu', '33': 'Tripura',
      '34': 'Telangana', '35': 'Uttar Pradesh', '36': 'Uttarakhand',
      '37': 'West Bengal', '38': 'Other Territory'
    };

    if (gstNumber && gstNumber.length >= 2) {
      const stateCode = gstNumber.substring(0, 2);
      const state = gstStateMap[stateCode] || 'Unknown State';
      console.log(`[Location] State from GST: ${state}`);
      return state;
    }

    return 'N/A';
  } catch (error) {
    console.error('[Location Error]', error.message);
    return 'N/A';
  }
};

// Extract address from web search
const fetchAddress = async (companyName, location) => {
  try {
    console.log(`[Address] Searching for: ${companyName}`);
    
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(companyName)}`;
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    const response = await axios.get(searchUrl, { headers, timeout: 5000 });
    const address = extractAddressFromHtml(response.data);
    
    if (address && address.length > 5) {
      console.log(`[Address] Found: ${address}`);
      return address;
    }

    return location || 'N/A';
  } catch (error) {
    console.error('[Address Error]', error.message);
    return location || 'N/A';
  }
};

// Extract email from company website
const fetchEmail = async (companyName, website) => {
  try {
    if (website === 'N/A' || !website) {
      return 'N/A';
    }

    console.log(`[Email] Fetching from: ${website}`);
    
    const response = await axios.get(website, { 
      timeout: 5000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const emails = extractEmails(response.data);
    if (emails.length > 0) {
      console.log(`[Email] Found: ${emails[0]}`);
      return emails[0];
    }

    return 'N/A';
  } catch (error) {
    console.error('[Email Error]', error.message);
    return 'N/A';
  }
};

// Helper: Extract phone numbers from text
const extractPhones = (html) => {
  const phoneRegex = /(\+91|0)?[\s-]?[6-9]\d{9}/g;
  const matches = html.match(phoneRegex) || [];
  return [...new Set(matches)].slice(0, 3);
};

// Helper: Extract emails from text
const extractEmails = (html) => {
  const emailRegex = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailRegex) || [];
  return [...new Set(matches)].filter(e => !e.includes('google') && !e.includes('noreply')).slice(0, 3);
};

// Helper: Extract address from HTML
const extractAddressFromHtml = (html) => {
  const $ = cheerio.load(html);
  const addressPatterns = [
    $('[class*="address"]').text(),
    $('[itemprop="streetAddress"]').text(),
    $('[data-qa="snippet-address"]').text(),
  ];
  
  return addressPatterns.find(addr => addr && addr.trim().length > 5) || null;
};

// Main fetch function
const fetchCompanyDetails = async (gstNumber, companyName) => {
  try {
    const searchTerm = companyName || gstNumber;

    const location = await fetchLocation(gstNumber, companyName);
    const website = await fetchWebsite(searchTerm);
    const phone = await fetchPhoneNumber(searchTerm);
    const address = await fetchAddress(searchTerm, location);
    const email = await fetchEmail(searchTerm, website);

    const companyInfo = {
      gstNumber: gstNumber || 'N/A',
      companyName: companyName || 'Company Name',
      phone: phone,
      website: website,
      location: location,
      address: address,
      email: email,
      fetchedAt: new Date().toISOString(),
    };

    return companyInfo;
  } catch (error) {
    throw new Error(`Failed to fetch company details: ${error.message}`);
  }
};

module.exports = {
  fetchCompanyDetails,
  fetchPhoneNumber,
  fetchWebsite,
  fetchLocation,
  fetchAddress,
  fetchEmail,
};
