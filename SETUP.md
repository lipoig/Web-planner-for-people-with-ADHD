# ADHD Planner - Setup Guide

This guide will help you get the ADHD Planner application running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB**
   - Option A: Install locally from https://www.mongodb.com/try/download/community
   - Option B: Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify local installation: `mongod --version`

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

## Quick Start (Local Development)

### 1. Get the Code

```bash
# If you have the project files
cd adhd-planner

# Or clone from repository (if available)
git clone <repository-url>
cd adhd-planner
```

### 2. Setup MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
# On macOS (using Homebrew):
brew services start mongodb-community

# On Windows:
# MongoDB should start automatically, or run:
net start MongoDB

# On Linux:
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# For local MongoDB:
#   MONGODB_URI=mongodb://localhost:27017/adhd-planner
# For MongoDB Atlas:
#   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adhd-planner

# Generate a secure JWT secret (or use any random string)
# On macOS/Linux:
#   openssl rand -base64 32
# Add this to JWT_SECRET in .env

# Start the backend server
npm run dev
```

The backend will start on http://localhost:5000

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### 4. Setup Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
# The default API URL is http://localhost:5000/api
# Create .env if you need to change it:
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the frontend development server
npm start
```

The frontend will start on http://localhost:3000 and open in your browser automatically.

### 5. Test the Application

1. Open http://localhost:3000 in your browser
2. You should see the Welcome page with "You don't have to be perfect, just get started"
3. Enter an email and password (minimum 6 characters)
4. Click "Start" to create an account
5. You'll be redirected to the Today dashboard
6. Try adding a task!

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Make sure MongoDB is running
- Local: `brew services start mongodb-community` (macOS) or `sudo systemctl start mongod` (Linux)
- Check if mongod process is running: `ps aux | grep mongod`

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Change the PORT in backend/.env or kill the process using port 5000:
```bash
# Find process on port 5000
lsof -i :5000

# Kill it (replace PID with actual process ID)
kill -9 PID
```

**Missing Dependencies**
```
Error: Cannot find module 'express'
```
Solution: Install dependencies again
```bash
cd backend
rm -rf node_modules
npm install
```

### Frontend Issues

**API Connection Error**
Check that:
1. Backend is running on port 5000
2. REACT_APP_API_URL is correct in frontend/.env
3. CORS is enabled on backend (it should be by default)

**Port 3000 Already in Use**
```
Something is already running on port 3000
```
Solution: Choose yes to run on different port, or kill process on 3000:
```bash
lsof -i :3000
kill -9 PID
```

**Module Not Found**
```bash
cd frontend
rm -rf node_modules
npm install
```

## Production Deployment

### Environment Variables

**Backend (.env for production):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/adhd-planner?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-secret-key-at-least-32-characters
NODE_ENV=production
```

**Frontend:**
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

### Build Frontend

```bash
cd frontend
npm run build
```

This creates a `build/` directory with optimized production files.

### Deploy Backend

1. Choose a hosting provider (Heroku, Railway, DigitalOcean, etc.)
2. Set environment variables on the platform
3. Deploy the backend directory
4. Make sure MongoDB is accessible from your hosting platform

### Deploy Frontend

1. Upload the `build/` directory to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting service

2. Configure environment variables on the platform
3. Point to your backend API URL

## Database Initialization

The application automatically creates necessary collections on first use. No manual database setup required.

### Manual Database Check

```bash
# Connect to MongoDB
mongosh

# Switch to database
use adhd-planner

# Check collections
show collections

# View users (in development only)
db.users.find()

# View tasks (in development only)
db.tasks.find()
```

## Development Workflow

### Running Both Servers

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Making Changes

- Frontend changes auto-reload
- Backend changes auto-reload (with nodemon)
- MongoDB schema changes require server restart

### Testing New Features

1. Create a test account (use a fake email like test@test.com)
2. Test the feature
3. Check browser console for errors
4. Check terminal for backend errors

## Next Steps

After setup:
1. Read the main README.md for feature overview
2. Check frontend/README.md for frontend details
3. Check backend/README.md for API documentation
4. Start coding!

## Getting Help

If you encounter issues:
1. Check the Troubleshooting section above
2. Make sure all prerequisites are installed
3. Verify environment variables are set correctly
4. Check that MongoDB is running
5. Look for error messages in the terminal

## Summary Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend .env file configured
- [ ] Backend server running (port 5000)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend server running (port 3000)
- [ ] Application accessible in browser
- [ ] Can create account and log in
- [ ] Can create and manage tasks

Congratulations! You're all set up. Happy coding! 🎉
