# ADHD Planner - Quick Reference Card

## 🚀 Getting Started (5 Minutes)

### 1. Install & Run
```bash
# Backend (Terminal 1)
cd backend
npm install
cp .env.example .env
# Edit .env: Add MongoDB URI and JWT secret
npm run dev

# Frontend (Terminal 2)
cd frontend
npm install
npm start
```

### 2. First Login
- Open http://localhost:3000
- Enter any email + password (min 6 chars)
- Click "Start" - creates account automatically

### 3. Add Your First Task
- Click the big "+ Add Task" button
- Enter task name
- Choose priority (optional)
- Add steps (optional)
- Click "Create"

## 📱 Key Features

### Today Dashboard
- Shows max 5 active tasks
- Click checkbox to complete
- Click task name to expand steps
- Edit icon (✎) to modify
- Delete icon (✕) to remove

### All Tasks Page
- View all your tasks
- Filter: All / Today / Later
- Color-coded priorities
- See step progress

### Creating Tasks
- **Task Name**: What you need to do
- **Priority**: Low (blue) / Medium (yellow) / High (red)
- **When**: Today or Later
- **Steps**: Break it down (optional)

## 🎨 Design Philosophy

- **No Pressure**: No deadlines, no penalties
- **Limited Options**: Max 5 tasks on Today page
- **Clear Actions**: One main action per page
- **Calming Colors**: Nature-inspired palette
- **Positive Language**: "What you can do" not "must do"

## ⌨️ Quick Tips

### Adding Tasks Quickly
1. Click "+ Add Task"
2. Type name, press Tab
3. Choose priority with mouse or Tab+Space
4. Press Enter to save

### Managing Steps
- Add steps to break down big tasks
- Check off steps as you complete them
- Steps remember their state
- No need to complete all steps

### Organizing Tasks
- "Today" = focus on these now
- "Later" = future tasks
- Move between them anytime
- No strict rules

## 🔧 Common Commands

### Backend
```bash
npm run dev     # Start development server
npm start       # Start production server
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
```

### MongoDB (Local)
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check if running
ps aux | grep mongod
```

## 📊 API Endpoints

```
POST   /api/auth/start          Login or register
GET    /api/tasks/today         Get today's tasks
GET    /api/tasks/all           Get all tasks
GET    /api/tasks/stats         Get progress
POST   /api/tasks               Create task
PUT    /api/tasks/:id           Update task
DELETE /api/tasks/:id           Delete task
PATCH  /api/tasks/:id/toggle    Toggle completion
```

## 🎯 File Structure at a Glance

```
adhd-planner/
├── backend/
│   ├── models/        User.js, Task.js
│   ├── routes/        auth.js, tasks.js
│   ├── middleware/    auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  Navigation, Modals
│   │   ├── pages/       Welcome, Dashboard, AllTasks
│   │   └── services/    api.js
│   └── public/
└── README.md
```

## ⚡ Keyboard Shortcuts

- **Tab**: Navigate between fields
- **Enter**: Submit forms
- **Escape**: Close modals
- **Space**: Toggle buttons (when focused)

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to MongoDB | Start MongoDB: `brew services start mongodb-community` |
| Port 5000 in use | Kill process: `lsof -i :5000` then `kill -9 PID` |
| API not responding | Check backend is running on port 5000 |
| Blank page | Check browser console for errors |
| Module not found | Run `npm install` again |

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adhd-planner
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 Color Palette

```css
Primary:    #2D5F5D  (Teal - Focus)
Accent:     #E87461  (Coral - Action)
Success:    #5FB381  (Green - Done!)
Low:        #9DC4C3  (Light Blue)
Medium:     #E8BD5D  (Yellow)
High:       #E87461  (Coral)
Background: #F8F6F1  (Warm Off-White)
```

## 💡 Best Practices

### For ADHD Users
- ✅ Start with 1-2 tasks, not 5
- ✅ Break tasks into small steps
- ✅ Move tasks to "Later" if overwhelmed
- ✅ Celebrate completing any task
- ❌ Don't feel guilty about incomplete tasks
- ❌ Don't over-plan - just start

### For Developers
- ✅ Keep UI minimal
- ✅ Reduce decision points
- ✅ Use positive language
- ✅ Make actions reversible
- ✅ Provide immediate feedback
- ❌ Don't add complexity
- ❌ Don't use red for warnings
- ❌ Don't shame users

## 🔗 Important Links

- Main README: `/README.md`
- Setup Guide: `/SETUP.md`
- Backend API: `/backend/README.md`
- Frontend Docs: `/frontend/README.md`

## 📞 Support

Check the troubleshooting sections in:
1. SETUP.md
2. Backend README
3. Frontend README

---

**Remember**: You don't have to be perfect, just get started! 💚
