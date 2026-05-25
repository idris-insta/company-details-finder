# 📚 API Documentation

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check

Check if the server is running.

**Request:**
```
GET /health
```

**Response:**
```json
{
  "status": "Server is running"
}
```

---

### 2. Search Company

Search for company details by GST number or company name.

**Request:**
```
POST /company/search
Content-Type: application/json

{
  "gstNumber": "27AAFCT5055K1Z0",
  "companyName": "Optional Company Name"
}
```

**Parameters:**

| Parameter | Type | Required | Format | Example |
|-----------|------|----------|--------|---------|
| gstNumber | string | No | 15 alphanumeric chars | `27AAFCT5055K1Z0` |
| companyName | string | No | 2-100 chars | `Acme Corporation` |

**Notes:**
- At least one parameter (gstNumber or companyName) is required
- If both are provided, GST number is prioritized
- GST format: `SSAAAAAAAAAACCCNNNN` where SS=state code

**Response (Success):**
```json
{
  "data": {
    "gstNumber": "27AAFCT5055K1Z0",
    "companyName": "Acme Corporation",
    "phone": "+919876543210",
    "website": "https://acmecorp.com",
    "location": "Maharashtra",
    "address": "123 Business Avenue, Mumbai",
    "email": "contact@acmecorp.com",
    "fetchedAt": "2024-01-15T10:30:45.123Z"
  },
  "source": "fetched",
  "status": "success",
  "message": "Company details fetched successfully"
}
```

**Response (From Cache):**
```json
{
  "data": {
    "gstNumber": "27AAFCT5055K1Z0",
    "companyName": "Acme Corporation",
    "phone": "+919876543210",
    "website": "https://acmecorp.com",
    "location": "Maharashtra",
    "address": "123 Business Avenue, Mumbai",
    "email": "contact@acmecorp.com",
    "fetchedAt": "2024-01-15T10:30:45.123Z"
  },
  "source": "cache",
  "status": "success",
  "message": "Data fetched from cache"
}
```

**Error Response (400 - Bad Request):**
```json
{
  "error": "Invalid GST number format. Expected format: 27AAFCT5055K1Z0",
  "status": "error"
}
```

**Error Response (500 - Server Error):**
```json
{
  "error": "Failed to fetch company details. Please try again later.",
  "details": "Network timeout",
  "status": "error"
}
```

---

### 3. Get Company Details by GST

Retrieve company details using only GST number.

**Request:**
```
GET /company/details/{gstNumber}
```

**Path Parameters:**

| Parameter | Type | Required | Format |
|-----------|------|----------|--------|
| gstNumber | string | Yes | 15 alphanumeric chars |

**Examples:**
```
GET /company/details/27AAFCT5055K1Z0
GET /company/details/19AABCT1234H1Z0
```

**Response:**
```json
{
  "data": {
    "gstNumber": "27AAFCT5055K1Z0",
    "companyName": "Company Name",
    "phone": "+919876543210",
    "website": "https://example.com",
    "location": "Maharashtra",
    "address": "Full Address",
    "email": "email@example.com",
    "fetchedAt": "2024-01-15T10:30:45.123Z"
  },
  "source": "fetched",
  "status": "success"
}
```

---

## GST State Codes

The first 2 digits of GST number indicate the state:

| Code | State | Code | State |
|------|-------|------|-------|
| 01 | Andaman and Nicobar Islands | 20 | Lakshadweep |
| 02 | Andhra Pradesh | 21 | Madhya Pradesh |
| 03 | Arunachal Pradesh | 22 | Maharashtra |
| 04 | Assam | 23 | Manipur |
| 05 | Bihar | 24 | Meghalaya |
| 06 | Chhattisgarh | 25 | Mizoram |
| 07 | Chandigarh | 26 | Nagaland |
| 08 | Dadra and Nagar Haveli | 27 | Odisha |
| 09 | Daman and Diu | 28 | Puducherry |
| 10 | Delhi | 29 | Punjab |
| 11 | Daman and Diu | 30 | Rajasthan |
| 12 | Gujarat | 31 | Sikkim |
| 13 | Himachal Pradesh | 32 | Tamil Nadu |
| 14 | Haryana | 33 | Tripura |
| 15 | Jharkhand | 34 | Telangana |
| 16 | Kashmir | 35 | Uttar Pradesh |
| 17 | Karnataka | 36 | Uttarakhand |
| 18 | Kerala | 37 | West Bengal |
| 19 | Ladakh | 38 | Other Territory |

---

## Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid input parameters |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |
| 503 | Service Unavailable | Server temporarily unavailable |

---

## Error Codes

| Error | Status | Cause | Solution |
|-------|--------|-------|----------|
| `Invalid GST number format` | 400 | GST format incorrect | Use 15-char format: `27AAFCT5055K1Z0` |
| `Company name must be 2-100 chars` | 400 | Invalid company name | Provide 2-100 character name |
| `Please provide GST or company name` | 400 | Both fields empty | Fill at least one field |
| `Failed to fetch company details` | 500 | Network/scraping error | Retry or check internet |

---

## Caching

- **Enabled by default**: Yes
- **TTL (Time-to-Live)**: 3600 seconds (1 hour)
- **Identifier**: `company_{gstNumber or companyName}`
- **Configuration**: Edit `backend/.env` to change

### Cache Behavior

1. First request → Fetches from web → Caches result
2. Repeated requests (within 1 hour) → Returns from cache
3. After 1 hour → Cache expires → Fetches fresh data

---

## Rate Limiting

Currently not implemented. Future versions will include:
- 100 requests/minute per IP
- 1000 requests/hour per IP

---

## CORS Headers

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Request Examples

### Using cURL

```bash
# Search by GST
curl -X POST http://localhost:5000/api/company/search \
  -H "Content-Type: application/json" \
  -d '{
    "gstNumber": "27AAFCT5055K1Z0"
  }'

# Search by Company Name
curl -X POST http://localhost:5000/api/company/search \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TCS"
  }'

# Get details by GST
curl http://localhost:5000/api/company/details/27AAFCT5055K1Z0
```

### Using JavaScript (Fetch API)

```javascript
// Search by GST
const response = await fetch('http://localhost:5000/api/company/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    gstNumber: '27AAFCT5055K1Z0'
  })
});

const data = await response.json();
console.log(data);
```

### Using Python

```python
import requests

url = 'http://localhost:5000/api/company/search'
payload = {
    'gstNumber': '27AAFCT5055K1Z0'
}

response = requests.post(url, json=payload)
data = response.json()
print(data)
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:5000/api/company/search`
3. Body (JSON):
   ```json
   {
     "gstNumber": "27AAFCT5055K1Z0"
   }
   ```
4. Send request

---

## Data Fields

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| gstNumber | string | Input | GST registration number |
| companyName | string | Scraped | Name of the company |
| phone | string | Scraped | Company phone number with country code |
| website | string | Scraped | Official website URL |
| location | string | GST Parse | State/Location from GST code |
| address | string | Scraped | Business address |
| email | string | Scraped | Contact email address |
| fetchedAt | ISO8601 | System | Timestamp of data fetch |

---

## Best Practices

1. **Always provide GST** when available for better accuracy
2. **Handle errors gracefully** - Check response status
3. **Use caching** - Avoid repeated searches
4. **Validate inputs** - Check GST format before sending
5. **Implement retry logic** - Network issues may occur
6. **Rate limit** - Don't spam requests

---

## Changelog

### Version 1.0.0 (Current)
- Search by GST number
- Search by company name
- Web scraping for phone, website, location
- Result caching
- Input validation
- CORS support

### Planned Features
- Official GST India API integration
- Batch search capability
- CSV export
- Search history
- Advanced filtering
- Mobile app

---

## Support

For issues or questions:
- Check SETUP.md for common problems
- Create an issue on GitHub
- Email: support@example.com
