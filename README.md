# ADHD Planner - Web Application

A web-based task planning application specifically designed for people with ADHD. The app focuses on minimizing decision fatigue, reducing cognitive load, and helping users take the first step without overwhelming them.

## Philosophy

- **You don't have to be perfect, just get started** - Our guiding principle
- **Focus on one day** - Reduce overwhelm by showing only what matters today
- **Minimum decisions** - Fewer choices, clearer actions
- **No penalties** - No guilt or shame for tasks not completed
- **Just 3-5 tasks** - Limited active tasks to prevent paralysis

## Features

### Pages
1. **Welcome/Start** - Simple unified login/registration
2. **Today Dashboard** - Focus on what you can do today (max 3-5 tasks)
3. **All Tasks** - View and filter all tasks by priority and timing

### Task Management
- Simple task creation with optional steps
- Priority levels (low, medium, high) as guidelines, not deadlines
- "Today" vs "Later" scheduling
- No penalties for incomplete tasks
- Progress tracking without pressure

### ADHD-Friendly Design
- Calming, nature-inspired color palette
- Clear visual hierarchy
- Reduced cognitive load
- Smooth animations without distraction
- Large, accessible buttons
- No overwhelming notifications

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Framer Motion for animations
- Axios for API calls
- Custom CSS with CSS variables

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adhd-planner
JWT_SECRET=your_secure_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/start` - Unified login/register endpoint

### Tasks
- `GET /api/tasks/today` - Get today's tasks (max 5)
- `GET /api/tasks/all?filter=today|later` - Get all tasks with optional filter
- `GET /api/tasks/stats` - Get completion statistics
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete task

## Project Structure

```
adhd-planner/
├── backend/
│   ├── models/          # MongoDB models (User, Task)
│   ├── routes/          # API routes (auth, tasks)
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Express server
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/  # Reusable components
    │   │   ├── Navigation.js
    │   │   ├── TaskModal.js
    │   │   └── ConfirmModal.js
    │   ├── pages/       # Page components
    │   │   ├── Welcome.js
    │   │   ├── Dashboard.js
    │   │   └── AllTasks.js
    │   ├── services/    # API service layer
    │   │   └── api.js
    │   ├── App.js       # Main app with routing
    │   ├── index.js     # Entry point
    │   └── index.css    # Global styles
    └── package.json
```

## Design Decisions

### Colors
- **Primary**: Calming teal/green (#2D5F5D) - promotes focus
- **Accent**: Warm coral (#E87461) - for important actions
- **Background**: Warm off-white (#F8F6F1) - reduces eye strain
- **Success**: Gentle green (#5FB381) - positive reinforcement

### Typography
- **Display**: Fraunces (serif) - friendly and approachable
- **Body**: DM Sans (sans-serif) - highly readable

### Interactions
- Smooth animations (respects prefers-reduced-motion)
- Large touch targets (min 32px)
- Clear focus indicators
- Gentle hover states

## ADHD-Specific Considerations

1. **Limited Choices**: Only 3-5 tasks shown on main dashboard
2. **No Deadlines**: Priorities are guidelines, not strict deadlines
3. **Positive Framing**: "What you can do" instead of "What you must do"
4. **No Punishment**: No red alerts or guilt-inducing messages
5. **Quick Wins**: Steps can be broken down for easier completion
6. **Flexibility**: Easy to move tasks between "today" and "later"

## Future Enhancements

- Daily reset of "today" tasks at midnight
- Task templates for recurring activities
- Celebration animations for completed tasks
- Weekly review (optional)
- Voice input for task creation
- Offline support with service workers

## Contributing

This project is designed with ADHD needs in mind. When contributing:
- Keep UI simple and uncluttered
- Avoid adding complexity
- Test with screen readers
- Consider cognitive load in all decisions
- Maintain the supportive, pressure-free tone

## License

MIT License - See LICENSE file for details

## Acknowledgments

Built with understanding and empathy for the ADHD experience. Special thanks to the ADHD community for their insights and feedback.
