# Vercel Deployment Guide - Frontend (Client)

## Quick Fix for Vercel Deployment

### The Problem
Your React app uses client-side routing (React Router), but Vercel doesn't know how to handle routes like `/courses`, `/login`, etc. It tries to find actual files and returns 404 errors.

### The Solution
I've created `vercel.json` that tells Vercel to redirect all routes to `index.html`, allowing React Router to handle routing.

---

## Deployment Steps

### Option 1: Using Vercel Dashboard (EASIEST)

1. **Go to Vercel**: https://vercel.com/dashboard

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**
   - Select your `LEARNING HUB` repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `client` ← IMPORTANT!
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```
   
   **Important**: 
   - Replace `your-backend-url.onrender.com` with your actual Render backend URL
   - Use your real Razorpay key

6. **Click "Deploy"**

7. **Wait for deployment** (usually takes 1-2 minutes)

8. **Your site will be live!** 🎉

---

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? learning-hub-client
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

---

## Important Configuration

### Files Created/Updated:

1. ✅ **client/vercel.json** - Handles client-side routing
2. ✅ **client/src/config/api.js** - Centralized API configuration
3. ✅ **client/.env.example** - Environment variables template

### What's in vercel.json:

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

This tells Vercel: "For ANY route, serve index.html and let React Router handle it"

---

## Environment Variables Setup

### In Vercel Dashboard:

1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_API_URL` | `https://your-backend.onrender.com` | Production |
| `VITE_RAZORPAY_KEY_ID` | Your Razorpay key | Production |

**Note**: 
- Don't include trailing slash in API URL
- Make sure your backend is deployed first on Render
- Update `VITE_API_URL` with your actual Render backend URL

---

## After Deployment

### 1. Update Backend CORS

Once your frontend is deployed, you need to update your backend's CORS settings:

**In Render Dashboard (for your backend)**:
- Go to Environment Variables
- Update `CLIENT_URL` to: `https://your-vercel-app.vercel.app`
- Redeploy the backend

### 2. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Home page loads
- ✅ Navigation works (courses, pricing, etc.)
- ✅ Login/Register works
- ✅ API calls work (check browser console for errors)

### 3. Custom Domain (Optional)

In Vercel dashboard:
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: Make sure `vercel.json` is in the `client` folder and properly configured

### Issue: API calls failing
**Solutions**:
1. Check `VITE_API_URL` environment variable in Vercel
2. Make sure backend is deployed and running
3. Check backend CORS settings include your Vercel URL
4. Open browser console to see exact error

### Issue: Environment variables not working
**Solutions**:
1. Make sure variable names start with `VITE_`
2. Redeploy after adding environment variables
3. Check spelling of variable names

### Issue: Build fails
**Solutions**:
1. Check build logs in Vercel dashboard
2. Make sure `package.json` has correct dependencies
3. Try building locally first: `npm run build`
4. Check for any TypeScript or linting errors

### Issue: Blank page after deployment
**Solutions**:
1. Check browser console for errors
2. Verify `dist` folder is being generated
3. Check if `index.html` exists in build output
4. Verify Vite config is correct

---

## Project Structure

```
client/
├── vercel.json          ← Routing configuration
├── .env                 ← Local environment variables (not committed)
├── .env.example         ← Template for environment variables
├── src/
│   ├── config/
│   │   └── api.js       ← API URL configuration
│   ├── pages/
│   ├── components/
│   └── ...
├── dist/                ← Build output (generated)
└── package.json
```

---

## Next Steps

### After Both Frontend and Backend are Deployed:

1. **Update API URLs**:
   - Frontend `VITE_API_URL` → Points to Render backend
   - Backend `CLIENT_URL` → Points to Vercel frontend

2. **Test OAuth**:
   - Update Google OAuth redirect URIs
   - Update GitHub OAuth callback URLs
   - Add your Vercel URL to allowed origins

3. **Test Payment Flow**:
   - Make sure Razorpay works with production URLs
   - Test checkout process

4. **Monitor**:
   - Check Vercel Analytics
   - Monitor Render logs
   - Watch for errors

---

## Important Notes

- ⚠️ Vercel free tier has limits (100GB bandwidth/month)
- ⚠️ Environment variables are only available at build time for Vite
- ⚠️ Always use `VITE_` prefix for environment variables in Vite
- ⚠️ Redeploy after changing environment variables
- ⚠️ Make sure backend is deployed BEFORE deploying frontend

---

## Deployment Checklist

- [ ] Backend deployed on Render
- [ ] `vercel.json` created in client folder
- [ ] Environment variables added in Vercel
- [ ] Root directory set to `client`
- [ ] Frontend deployed successfully
- [ ] Backend CORS updated with Vercel URL
- [ ] All routes working (test navigation)
- [ ] API calls working (test login/register)
- [ ] OAuth working (if configured)
- [ ] Payment flow working (if applicable)

---

## Need Help?

If deployment fails:
1. Check Vercel build logs
2. Verify `Root Directory` is set to `client`
3. Ensure `vercel.json` is in the client folder
4. Check environment variables are set correctly
5. Make sure backend is accessible from Vercel

**Your frontend should now deploy successfully on Vercel!** 🚀
