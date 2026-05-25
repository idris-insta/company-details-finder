import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/company/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch company details');
      }

      setResults(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🏢 Company Details Finder</h1>
          <p>Search by GST Number or Company Name</p>
        </header>

        <main className="main-content">
          <SearchForm onSearch={handleSearch} loading={loading} />

          {error && <div className="error-message">{error}</div>}

          {loading && <div className="loading">Finding company details...</div>}

          {results && <ResultsDisplay data={results} />}
        </main>
      </div>
    </div>
  );
}

export default App;
