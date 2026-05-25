# ⚡ Quick Reference Card

## 🚀 Start the App (2 Steps)

```bash
# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Frontend  
cd frontend && npm install && npm start
```

**App opens automatically at**: http://localhost:3000

---

## 🔍 How to Use

| Action | What to Do |
|--------|-----------|
| **Search by GST** | Enter `27AAFCT5055K1Z0` → Click Search |
| **Search by Name** | Enter `TCS` or `Infosys` → Click Search |
| **Both Fields** | Enter both → GST takes priority |
| **Get Results** | Wait 2-5 seconds (first time), instant (cached) |

---

## 📊 What You Get

| Field | What It Shows | Source |
|-------|---------------|--------|
| 🏢 Company Name | Legal company name | Web scraped |
| 🔢 GST Number | Registration number | User input |
| 📞 Phone | Contact number | Business directory |
| 🌐 Website | Company website | DNS lookup |
| 📍 Location | State/Region | GST decoded |
| 📬 Address | Business address | Google Maps |
| 📧 Email | Contact email | Website crawl |
| ⏰ Fetch Time | When data was retrieved | System |

---

## 🛠️ API Quick Test

```bash
# Test with cURL
curl -X POST http://localhost:5000/api/company/search \
  -H "Content-Type: application/json" \
  -d '{"gstNumber":"27AAFCT5055K1Z0"}'

# Health check
curl http://localhost:5000/api/health
```

---

## ⚙️ Configure Settings

**File**: `backend/.env`

```env
PORT=5000                 # Change server port
CACHE_TTL=3600           # Cache duration (in seconds)
CACHE_ENABLED=true       # Enable/disable caching
```

---

## 🧪 Test Data

| GST Number | State | Status |
|------------|-------|--------|
| 27AAFCT5055K1Z0 | Maharashtra | ✅ Valid format |
| 29ABCDE1234F1Z5 | Punjab | ✅ Valid format |
| 19AABCT1234H1Z0 | Karnataka | ✅ Valid format |
| INVALID123 | N/A | ❌ Invalid |

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 5000 in use** | Change PORT in `.env` |
| **npm not found** | Install Node.js from nodejs.org |
| **Module errors** | Delete `node_modules`, run `npm install` |
| **Backend not connecting** | Check backend is running on port 5000 |
| **Returns N/A for data** | Website may block scraping - use valid GST |

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Start point for backend |
| `backend/routes/company.js` | API endpoints |
| `backend/services/scraper.js` | Web scraping logic |
| `frontend/src/App.js` | React main component |
| `frontend/package.json` | Frontend dependencies |
| `SETUP.md` | Installation guide |
| `API.md` | API documentation |

---

## 📚 Documentation

| Document | Contains |
|----------|----------|
| **README.md** | Overview & features |
| **SETUP.md** | Step-by-step setup guide |
| **API.md** | API endpoints & examples |
| **PROJECT_SUMMARY.md** | Complete project details |

---

## 🎯 Key URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend App | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| Health Check | http://localhost:5000/api/health | 5000 |
| GitHub Repo | https://github.com/idris-insta/company-details-finder | - |

---

## 📦 Dependencies Summary

### Backend
- **express**: Web framework
- **axios**: HTTP requests
- **cheerio**: HTML parsing
- **node-cache**: Caching
- **dotenv**: Environment variables
- **cors**: Cross-origin requests

### Frontend
- **react**: UI framework
- **react-dom**: DOM binding
- **react-scripts**: Build tools

---

## 🔐 Security Checklist

- ✅ Input validation (GST format)
- ✅ HTML sanitization
- ✅ CORS enabled
- ✅ Error handling
- ✅ No sensitive data in code
- ✅ Environment variables (.env)

---

## 📊 Performance Stats

| Operation | Time | Status |
|-----------|------|--------|
| First search (fresh) | 2-5 sec | ⚠️ Normal (web scraping) |
| Cached search | <100ms | ✅ Fast |
| GST validation | Instant | ✅ Instant |
| Location detection | Instant | ✅ Instant |

---

## 🎨 UI Features

- 📱 Mobile responsive
- 🎨 Gradient background
- 🎬 Smooth animations
- 📊 Card-based layout
- 🌙 Professional design
- ✨ Loading states
- ❌ Error messages

---

## 🚀 Next Steps

1. ✅ **Install & Run** - Follow SETUP.md
2. ✅ **Test the App** - Use sample GST numbers
3. ✅ **Read Documentation** - Check API.md
4. ✅ **Deploy** - Use Heroku, AWS, or Docker
5. ✅ **Extend** - Add features as needed

---

## 💬 Common Questions

**Q: Why does it take 2-5 seconds?**
A: First request scrapes web. Cached requests are instant.

**Q: Can I use invalid GST?**
A: No, GST format is validated (15 chars, pattern-checked).

**Q: Will it work offline?**
A: No, requires internet for web scraping.

**Q: Can I run backend and frontend separately?**
A: Yes, they're independent. Backend on 5000, Frontend on 3000.

**Q: How long is data cached?**
A: 1 hour by default (change CACHE_TTL in .env).

---

## 📞 Need Help?

1. Check **SETUP.md** for common issues
2. Review **API.md** for endpoint details
3. Check browser console for errors
4. Verify backend is running: `curl http://localhost:5000/api/health`

---

## 🎉 Ready to Go!

Your Company Details Finder is ready to use. Start with:

```bash
cd backend && npm run dev
```

Then in another terminal:

```bash
cd frontend && npm start
```

**Happy searching!** 🚀
