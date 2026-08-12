# 🚀 Hospital Management System - Deployment Guide

## Overview
Your project has two parts:
- **Frontend**: HTML, CSS, JavaScript (static files)
- **Backend**: Node.js/Express API + MongoDB

---

## 📋 Deployment Options

### Option 1: FREE & EASY (Recommended for beginners)
1. **Backend**: Deploy to Render.com (FREE tier)
2. **Database**: MongoDB Atlas (FREE tier - 512MB)
3. **Frontend**: Deploy to Netlify or Vercel (FREE tier)

### Option 2: More Reliable (Paid)
1. **Backend**: Railway.app or Heroku
2. **Database**: MongoDB Atlas (Shared)
3. **Frontend**: Netlify or Vercel

---

## 🔧 Step-by-Step Deployment

### STEP 1: Prepare Your Backend for Deployment

#### 1.1 Update MongoDB Connection
Edit `backend/.env`:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=production
```

#### 1.2 Create MongoDB Atlas Account (FREE)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for FREE
3. Create a cluster (choose FREE tier)
4. Get connection string
5. Create a database user
6. Add your connection string to `.env`

#### 1.3 Update CORS for Frontend
In `backend/server.js`, update the CORS configuration:
```javascript
app.use(cors({
    origin: "your-frontend-url.com",
    credentials: true
}));
```

---

### STEP 2: Deploy Backend to Render.com (Recommended)

#### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Verify email

#### 2.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Fill in details:
   - **Name**: hospital-management-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### 2.3 Add Environment Variables
1. In Render dashboard → Settings → Environment
2. Add these variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_management?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=production
   ```
3. Deploy

**Your backend URL will be**: `https://hospital-management-api.onrender.com`

---

### STEP 3: Update Frontend for Production

#### 3.1 Update API Base URL
Edit `script.js` at the top:
```javascript
const API_BASE_URL = "https://hospital-management-api.onrender.com/api";
```

#### 3.2 Update in HTML files
In `register.html`, `login.html`, `doctor-login.html`, `admin-login.html`, update fetch URLs:
```javascript
// Change from:
"http://localhost:5000/api/..."

// Change to:
"https://hospital-management-api.onrender.com/api/..."
```

---

### STEP 4: Deploy Frontend to Netlify (Recommended)

#### 4.1 Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub
3. Authorize Netlify

#### 4.2 Deploy Your Project
1. Click "Add new site" → "Import an existing project"
2. Select your GitHub repository
3. Configure build settings:
   - **Base directory**: (leave empty)
   - **Build command**: (leave empty)
   - **Publish directory**: (leave empty or "/")

#### 4.3 Deploy
1. Click "Deploy site"
2. Wait 2-3 minutes for deployment

**Your frontend URL will be**: `https://your-site-name.netlify.app`

---

### STEP 5: Update Backend CORS Again
Update `backend/server.js`:
```javascript
app.use(cors({
    origin: "https://your-site-name.netlify.app",
    credentials: true
}));
```
Then redeploy backend on Render.

---

## 📱 Alternative: Deploy Everything Together on One Platform

### Using Railway.app (Easier)
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Deploy from GitHub
5. Add MongoDB Atlas connection string
6. Done!

### Using Heroku (Paid but very stable)
1. Go to https://heroku.com
2. Create account
3. Install Heroku CLI
4. Run:
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

---

## ✅ Checklist Before Deployment

- [ ] MongoDB Atlas account created
- [ ] Database connection string obtained
- [ ] `.env` file has correct MongoDB URI
- [ ] `.env` is added to `.gitignore`
- [ ] Frontend API URLs updated
- [ ] CORS origins updated in backend
- [ ] All code committed to GitHub
- [ ] `package.json` has correct dependencies

---

## 🧪 Test After Deployment

1. Open your frontend URL in browser
2. Try patient registration
3. Try login
4. Book appointment
5. Check doctor dashboard

---

## 🆘 Troubleshooting

### "Connection refused" error
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0)

### "CORS error"
- Update origin in `backend/server.js` with your frontend URL
- Redeploy backend

### "Cannot POST /api/..."
- Check API endpoint is correct
- Verify backend is running

---

## 💰 Estimated Monthly Cost (FREE)
- Render Web Service: FREE (with limitations)
- MongoDB Atlas: FREE (512MB)
- Netlify: FREE
- **Total: $0/month** ✅

---

## 🎯 Next Steps After Deployment

1. Get your domain name (godaddy.com, namecheap.com)
2. Connect to Netlify/Render
3. Setup SSL (automatic on Netlify)
4. Monitor logs and errors

---

Need help with any specific platform? Let me know!
