import React from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ data }) {
  const formatValue = (value) => {
    return value === 'N/A' ? '—' : value;
  };

  return (
    <div className="results-container">
      <h2>Company Details</h2>
      <div className="results-grid">
        <div className="result-card">
          <div className="card-icon">🏢</div>
          <div className="card-label">Company Name</div>
          <div className="card-value">{formatValue(data.companyName)}</div>
        </div>

        <div className="result-card">
          <div className="card-icon">🔢</div>
          <div className="card-label">GST Number</div>
          <div className="card-value">{formatValue(data.gstNumber)}</div>
        </div>

        <div className="result-card">
          <div className="card-icon">📍</div>
          <div className="card-label">Location</div>
          <div className="card-value">{formatValue(data.location)}</div>
        </div>

        <div className="result-card">
          <div className="card-icon">📞</div>
          <div className="card-label">Phone</div>
          <div className="card-value">{formatValue(data.phone)}</div>
        </div>

        <div className="result-card">
          <div className="card-icon">🌐</div>
          <div className="card-label">Website</div>
          <div className="card-value">
            {data.website !== 'N/A' ? (
              <a href={data.website} target="_blank" rel="noopener noreferrer">
                {data.website}
              </a>
            ) : (
              formatValue(data.website)
            )}
          </div>
        </div>

        <div className="result-card">
          <div className="card-icon">📧</div>
          <div className="card-label">Email</div>
          <div className="card-value">{formatValue(data.email)}</div>
        </div>

        <div className="result-card">
          <div className="card-icon">📬</div>
          <div className="card-label">Address</div>
          <div className="card-value">{formatValue(data.address)}</div>
        </div>

        <div className="result-card">
          <div className="card-icon">⏰</div>
          <div className="card-label">Fetched At</div>
          <div className="card-value">
            {new Date(data.fetchedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;
