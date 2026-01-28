# Vercel Deployment - Quick Fix Summary

## What Was Wrong?

1. ❌ No `vercel.json` - Vercel couldn't handle React Router routes
2. ❌ API URLs hardcoded to localhost - Won't work in production
3. ❌ No environment variable configuration

## What I Fixed?

### 1. Created `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
**Why**: This makes ALL routes go to index.html, allowing React Router to work

### 2. Created `src/config/api.js`
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default API_BASE_URL;
```
**Why**: Centralizes API URL and supports environment variables

### 3. Updated `.env.example`
Added `VITE_API_URL` configuration

---

## How to Deploy NOW

### Step 1: Push to GitHub
```bash
git add client/vercel.json client/src/config/api.js client/.env.example client/VERCEL_DEPLOYMENT.md
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. **Set Root Directory to: `client`** ← CRITICAL!
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com`
   - `VITE_RAZORPAY_KEY_ID` = your key
6. Click "Deploy"

### Step 3: Update Backend
After frontend deploys, update backend environment variable:
- `CLIENT_URL` = `https://your-app.vercel.app`

---

## The ONE Setting That Matters Most

In Vercel project settings:

```
Root Directory: client
```

**This is the #1 reason deployments fail!**

---

## Files Changed

| File | Status | Purpose |
|------|--------|---------|
| `client/vercel.json` | ✅ NEW | Handle client-side routing |
| `client/src/config/api.js` | ✅ NEW | API URL configuration |
| `client/.env.example` | ✅ UPDATED | Environment variables template |
| `client/VERCEL_DEPLOYMENT.md` | ✅ NEW | Full deployment guide |

---

## Quick Checklist

- [ ] `vercel.json` created
- [ ] Root Directory set to `client` in Vercel
- [ ] `VITE_API_URL` environment variable added
- [ ] Backend deployed on Render first
- [ ] Backend `CLIENT_URL` updated after frontend deploys

---

**Ready to deploy!** 🚀

See `VERCEL_DEPLOYMENT.md` for detailed instructions.
