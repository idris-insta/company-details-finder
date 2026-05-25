# Company Details Finder App

A web application to fetch company details (phone, website, location, address) using GST number or company name.

## Features

- 🔍 Search by GST Number or Company Name
- 📍 Fetch Location & Address
- 📞 Extract Phone Numbers
- 🌐 Find Website URLs
- ⚡ Caching for faster results
- 🎨 Beautiful, responsive UI
- 📱 Mobile-friendly design

## Tech Stack

### Backend
- **Node.js** with Express.js
- **Axios** for HTTP requests
- **Cheerio** for HTML parsing
- **Puppeteer** for advanced scraping (optional)
- **NodeCache** for result caching
- **CORS** for cross-origin requests

### Frontend
- **React** 18.2
- **CSS3** with animations
- **Axios** for API calls
- **Responsive Grid Layout**

## Project Structure

```
company-details-finder/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── routes/
│   │   └── company.js
│   ├── controllers/
│   │   └── companyController.js
│   └── services/
│       ├── scraper.js
│       └── cacheService.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── App.css
│       └── components/
│           ├── SearchForm.js
│           ├── SearchForm.css
│           ├── ResultsDisplay.js
│           └── ResultsDisplay.css
└── README.md
```

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

### Terminal 2 - Start Frontend

```bash
cd frontend
npm start
```

The app will open in your browser at `http://localhost:3000`

## API Endpoints

### POST /api/company/search
Search for company details by GST or name

**Request Body:**
```json
{
  "gstNumber": "27AAFCT5055K1Z0",
  "companyName": "Optional Company Name"
}
```

**Response:**
```json
{
  "data": {
    "gstNumber": "27AAFCT5055K1Z0",
    "companyName": "Company Name",
    "phone": "9876543210",
    "website": "https://example.com",
    "location": "City, State",
    "address": "Full Address",
    "email": "contact@example.com",
    "fetchedAt": "2024-01-01T10:00:00Z"
  },
  "source": "fetched"
}
```

### GET /api/company/details/:gstNumber
Get details for a specific GST number

**Response:** Same as search endpoint

## Configuration

Edit `.env` file in backend folder:

```env
PORT=5000
NODE_ENV=development
CACHE_ENABLED=true
CACHE_TTL=3600
```

## Future Enhancements

- [ ] Integration with official GST India API
- [ ] Advanced web scraping for multiple sources
- [ ] Database storage for historical data
- [ ] User authentication
- [ ] Batch processing for multiple companies
- [ ] Export results to CSV/PDF
- [ ] Dark mode UI
- [ ] Rate limiting and request throttling
- [ ] Email notifications
- [ ] Admin dashboard

## Error Handling

The app gracefully handles:
- Missing or invalid GST numbers
- Network errors
- Timeout issues
- Rate limiting
- Invalid company names

## Caching

- Results are cached for 1 hour (configurable)
- Reduces redundant API calls
- Speeds up repeated searches

## Performance

- Async/await for non-blocking operations
- Connection pooling for HTTP requests
- Efficient DOM rendering in React
- CSS animations for smooth UX

## License

MIT License

## Support

For issues or questions, please contact the development team.
