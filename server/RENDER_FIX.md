# Render Deployment - Quick Fix Guide

## The Problem
Render was trying to run commands in the wrong directory (root instead of server folder).

## The Solution
I've created a `render.yaml` file that tells Render exactly how to deploy your app.

## Steps to Deploy (UPDATED)

### Option 1: Using render.yaml (RECOMMENDED - Easiest)

1. **Push the latest changes to GitHub** (render.yaml is now included)

2. **Go to Render Dashboard**: https://render.com/dashboard

3. **Click "New +" → "Blueprint"**
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
   - Click "Apply"

4. **Set Environment Variables** in Render dashboard:
   ```
   DATABASE_URL=your_mysql_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

5. **Deploy!** - Render will automatically build and deploy

---

### Option 2: Manual Web Service Setup (If Blueprint doesn't work)

If you already created a Web Service manually, update these settings:

1. **Go to your service** in Render dashboard

2. **Update Settings**:
   - **Root Directory**: `server` ← IMPORTANT!
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`

3. **Environment Variables**: Add all the variables listed above

4. **Manual Deploy**: Click "Manual Deploy" → "Deploy latest commit"

---

## What I Fixed

### Files Created/Updated:
1. ✅ **render.yaml** - Tells Render how to deploy (rootDir: server)
2. ✅ **package.json** (root) - Helps with alternative deployment
3. ✅ **server/package.json** - Simplified build script

### Key Changes:
- **Root Directory**: Now set to `server` folder
- **Build Command**: Simplified to avoid migration errors
- **Health Check**: Configured to use `/health` endpoint

---

## Troubleshooting

### If deployment still fails:

1. **Check the Root Directory setting**:
   - Go to Settings → Build & Deploy
   - Ensure "Root Directory" is set to: `server`

2. **Check Build Command**:
   - Should be: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Or simpler: `npm install && npm run build`

3. **Check Start Command**:
   - Should be: `npm start`

4. **Check Environment Variables**:
   - Make sure `DATABASE_URL` is set correctly
   - Format: `mysql://username:password@host:port/database_name`

5. **Check Logs**:
   - Look for specific error messages
   - Common issues:
     - Database connection failed → Check DATABASE_URL
     - Module not found → Clear build cache and redeploy
     - Port already in use → Render handles this automatically

---

## Database Setup

You need a MySQL database. Options:

### Option A: PlanetScale (Recommended - Free)
1. Go to https://planetscale.com
2. Create a free database
3. Get connection string
4. Use it as DATABASE_URL

### Option B: Railway (Free tier)
1. Go to https://railway.app
2. Create MySQL database
3. Get connection string
4. Use it as DATABASE_URL

### Option C: Render MySQL
1. In Render dashboard, create a MySQL database
2. Copy the Internal Database URL
3. Use it as DATABASE_URL

---

## After Deployment

1. **Test the health endpoint**:
   - Visit: `https://your-service.onrender.com/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

2. **Test an API endpoint**:
   - Example: `https://your-service.onrender.com/plans`

3. **Update your frontend**:
   - Change API URL to: `https://your-service.onrender.com`

---

## Important Notes

- ⚠️ Free tier spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ⚠️ Make sure all environment variables are set before deploying
- ⚠️ Database must be accessible from Render's servers

---

## Need Help?

If you're still getting errors:
1. Share the full error log from Render
2. Check that Root Directory is set to `server`
3. Verify all environment variables are set
4. Make sure your database is accessible
