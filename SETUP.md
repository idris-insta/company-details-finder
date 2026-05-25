# 🚀 Quick Start Guide - Company Details Finder

## Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** v6+ (comes with Node.js)
- **Git** (optional)

## Installation & Setup

### Step 1: Clone or Download Project

```bash
git clone https://github.com/idris-insta/company-details-finder.git
cd company-details-finder
```

### Step 2: Backend Setup

Open **Terminal 1** and run:

```bash
cd backend
npm install
```

This will install all dependencies:
- express (web framework)
- axios (HTTP requests)
- cheerio (HTML parsing)
- dotenv (environment variables)
- node-cache (result caching)
- cors (cross-origin support)

### Step 3: Frontend Setup

Open **Terminal 2** and run:

```bash
cd frontend
npm install
```

This will install React and related dependencies.

## Running the Application

### Start Backend Server

In **Terminal 1** (inside `backend` folder):

```bash
npm run dev
```

Expected output:
```
Server running on port 5000
```

### Start Frontend Application

In **Terminal 2** (inside `frontend` folder):

```bash
npm start
```

This will automatically open the app in your browser at **http://localhost:3000**

## 📝 How to Use

1. **Open the app** - Browser should open automatically to http://localhost:3000
2. **Enter GST Number** - Example: `27AAFCT5055K1Z0`
   - OR **Enter Company Name** - Example: `TCS` or `Infosys`
3. **Click "Search"** button
4. **View Results** - Company details will be displayed in cards

## API Testing (Optional)

### Test Backend with cURL

```bash
# Search by GST
curl -X POST http://localhost:5000/api/company/search \
  -H "Content-Type: application/json" \
  -d '{"gstNumber":"27AAFCT5055K1Z0"}'

# Search by Company Name
curl -X POST http://localhost:5000/api/company/search \
  -H "Content-Type: application/json" \
  -d '{"companyName":"TCS"}'

# Get by GST
curl http://localhost:5000/api/company/details/27AAFCT5055K1Z0

# Health Check
curl http://localhost:5000/api/health
```

## Sample GST Numbers to Test

(These are examples - actual data may vary)

- `27AAFCT5055K1Z0` - Maharashtra
- `29ABCDE1234F1Z5` - Punjab
- `19AABCT1234H1Z0` - Karnataka
- `07AADCT7654K1Z0` - Chandigarh

## Features

✅ **Search Capabilities**
- By GST Number
- By Company Name
- Auto-detect state from GST
- Smart web scraping for additional data

✅ **Fetched Details**
- Company Name
- GST Number
- Phone Number
- Website URL
- Location (State)
- Address
- Email
- Fetch timestamp

✅ **Performance**
- Result caching (1 hour default)
- Fast repeated searches
- Async operations
- Rate limiting ready

✅ **Error Handling**
- Input validation
- Graceful fallbacks
- Detailed error messages
- Network timeout handling

## Configuration

### Backend .env File

Located in `backend/.env`:

```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment
CACHE_ENABLED=true          # Enable caching
CACHE_TTL=3600              # Cache duration in seconds (1 hour)
```

### Change Settings

```env
# To use different port
PORT=8000

# To disable caching
CACHE_ENABLED=false

# To cache for 30 minutes
CACHE_TTL=1800
```

## Troubleshooting

### Port Already in Use

```bash
# If port 5000 is in use, change in .env file
PORT=5001
```

### Module Not Found Errors

```bash
# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### CORS Errors

- Make sure backend is running on port 5000
- Frontend proxy is configured correctly
- Check `frontend/package.json` proxy setting

### Scraping Returns N/A

This is normal when:
- Website is behind authentication
- Website blocks scraping
- Network issues
- Invalid GST/Company name

### Backend not connecting

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Should return:
# {"status":"Server is running"}
```

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
│       ├── cacheService.js
│       └── validation.js
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
│           ├── ResultsDisplay.js
│           └── CSS files
└── README.md
```

## API Response Format

### Success Response

```json
{
  "data": {
    "gstNumber": "27AAFCT5055K1Z0",
    "companyName": "Company Name",
    "phone": "+919876543210",
    "website": "https://example.com",
    "location": "Maharashtra",
    "address": "123 Business Street, City",
    "email": "contact@example.com",
    "fetchedAt": "2024-01-15T10:30:00Z"
  },
  "source": "fetched",
  "status": "success",
  "message": "Company details fetched successfully"
}
```

### Error Response

```json
{
  "error": "Invalid GST number format",
  "status": "error"
}
```

## Performance Tips

1. **Use Caching** - Repeated searches are instant
2. **Provide GST** - GST searches are faster and more accurate
3. **Check Network** - Web scraping depends on internet speed
4. **Batch Operations** - Use the API directly for bulk searches

## Next Steps

- [ ] Add database to store search history
- [ ] Implement user authentication
- [ ] Create admin dashboard
- [ ] Add CSV export feature
- [ ] Deploy to production (Heroku, AWS, etc.)
- [ ] Add batch upload functionality
- [ ] Integrate official GST API

## Support & Contribution

For issues, bugs, or feature requests:
1. Check the troubleshooting section
2. Check GitHub issues
3. Create a new issue with details

## License

MIT License - Free to use and modify

---

**Made with ❤️ | Happy Searching!**
