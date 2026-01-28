# Render Deployment Guide

## Prerequisites
- A Render account (https://render.com)
- A MySQL database (you can use Render's managed MySQL or external services like PlanetScale, Railway, etc.)

## Deployment Steps

### 1. Database Setup
First, set up a MySQL database. You can use:
- **Render MySQL** (recommended for simplicity)
- **PlanetScale** (free tier available)
- **Railway** (free tier available)

Get your `DATABASE_URL` connection string.

### 2. Create Web Service on Render

1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

   **Basic Settings:**
   - Name: `learning-hub-server` (or your preferred name)
   - Region: Choose closest to your users
   - Branch: `main` (or your default branch)
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### 3. Environment Variables

Add these environment variables in Render dashboard:

```
DATABASE_URL=your_mysql_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CLIENT_URL=https://your-frontend-url.onrender.com
```

**Important Notes:**
- Replace all placeholder values with your actual credentials
- `DATABASE_URL` format: `mysql://username:password@host:port/database_name`
- `CLIENT_URL` should be your deployed frontend URL (set this after deploying frontend)

### 4. Health Check Configuration

Render will automatically use the `/health` endpoint to monitor your service.

**Health Check Path:** `/health`

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Generate Prisma client
   - Run database migrations
   - Start your server

### 6. Verify Deployment

Once deployed, test your API:
- Health check: `https://your-service.onrender.com/health`
- Should return: `{"status":"ok","message":"Server is running"}`

## Troubleshooting

### Common Issues:

1. **Build fails with Prisma errors:**
   - Ensure `DATABASE_URL` is set correctly
   - Check that your database is accessible from Render

2. **Server starts but crashes:**
   - Check logs in Render dashboard
   - Verify all environment variables are set
   - Ensure database connection string is correct

3. **CORS errors:**
   - Update `CLIENT_URL` environment variable with your frontend URL
   - Redeploy the service

4. **Database migration fails:**
   - Manually run migrations if needed
   - Use Render shell: `npx prisma migrate deploy`

## Post-Deployment

1. Update your frontend's API URL to point to: `https://your-service.onrender.com`
2. Test all endpoints
3. Monitor logs for any errors

## Free Tier Limitations

Render's free tier:
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading for production use

## Support

For issues, check:
- Render logs in dashboard
- Render documentation: https://render.com/docs
- Prisma documentation: https://www.prisma.io/docs
