const validateGST = (gstNumber) => {
  if (!gstNumber || typeof gstNumber !== 'string') {
    return false;
  }
  
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gstNumber.toUpperCase());
};

const validateCompanyName = (companyName) => {
  if (!companyName || typeof companyName !== 'string') {
    return false;
  }
  
  return companyName.trim().length >= 2 && companyName.trim().length <= 100;
};

const sanitizeInput = (input) => {
  return input.trim().replace(/[<>\"']/g, '');
};

const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  return phone;
};

module.exports = {
  validateGST,
  validateCompanyName,
  sanitizeInput,
  formatPhoneNumber,
};
