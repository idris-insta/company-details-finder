import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, loading }) {
  const [gstNumber, setGstNumber] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gstNumber && !companyName) {
      alert('Please enter GST Number or Company Name');
      return;
    }
    onSearch({ gstNumber, companyName });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="gst">GST Number:</label>
        <input
          type="text"
          id="gst"
          placeholder="e.g., 27AAFCT5055K1Z0"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          disabled={loading}
          maxLength="15"
        />
      </div>

      <div className="form-divider">OR</div>

      <div className="form-group">
        <label htmlFor="company">Company Name:</label>
        <input
          type="text"
          id="company"
          placeholder="e.g., Acme Corporation"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={loading}
        />
      </div>

      <button type="submit" className="search-btn" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;
