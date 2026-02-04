# ADHD Planner Frontend

React-based frontend for the ADHD Planner application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.js    # Top navigation bar
│   ├── TaskModal.js     # Create/edit task modal
│   ├── ConfirmModal.js  # Delete confirmation modal
│   └── *.css            # Component styles
├── pages/               # Page components
│   ├── Welcome.js       # Landing/auth page
│   ├── Dashboard.js     # Today's tasks page
│   ├── AllTasks.js      # All tasks page
│   └── *.css            # Page styles
├── services/            # API layer
│   └── api.js           # API service with axios
├── App.js               # Main app with routing
├── index.js             # Entry point
└── index.css            # Global styles
```

## Components

### Navigation
Sticky top navigation with:
- Brand logo and name
- Links to Today and All Tasks
- User menu with logout

### TaskModal
Modal for creating and editing tasks:
- Task name (required)
- Priority selection (low/medium/high)
- When to do it (today/later)
- Optional steps with add/remove functionality

### ConfirmModal
Simple confirmation dialog for destructive actions:
- Used for task deletion
- Clear yes/no options

## Pages

### Welcome
- Clean, minimal landing page
- Unified login/registration form
- Automatically detects if email exists
- Calming animations

### Dashboard (Today)
- Shows max 5 active tasks for today
- Progress indicator
- Large "Add Task" button
- Task completion toggle
- Expandable steps
- Edit and delete actions

### AllTasks
- View all active tasks
- Filter by: All, Today, Later
- Priority badges
- Step completion indicators
- Edit and delete actions

## Styling

### CSS Variables
All colors and spacing use CSS variables for consistency:
```css
--color-primary: #2D5F5D
--color-accent: #E87461
--color-bg: #F8F6F1
--space-sm: 1rem
--radius-md: 12px
```

### Responsive Design
- Mobile-first approach
- Breakpoints at 600px and 768px
- Touch-friendly targets (min 32px)

### Accessibility
- Focus indicators on all interactive elements
- Semantic HTML
- ARIA labels on icon buttons
- Respects prefers-reduced-motion

## Animations

Using Framer Motion for:
- Page transitions
- Modal entrance/exit
- List item animations
- Hover effects
- Loading states

All animations respect `prefers-reduced-motion` setting.

## API Integration

The app communicates with the backend via axios with:
- Automatic JWT token injection
- Request/response interceptors
- Error handling
- Automatic redirect on 401

### API Service Methods

```javascript
// Authentication
authService.start(email, password)
authService.logout()
authService.isAuthenticated()

// Tasks
taskService.getTodayTasks()
taskService.getAllTasks(filter)
taskService.getStats()
taskService.createTask(taskData)
taskService.updateTask(id, updates)
taskService.toggleTask(id)
taskService.deleteTask(id)
```

## State Management

Currently using React's built-in state management:
- useState for local component state
- useEffect for data fetching
- No external state library needed

## Routing

React Router v6 with:
- Public routes (Welcome)
- Private routes (Dashboard, AllTasks)
- Automatic redirects based on auth state

## ADHD-Friendly Features

### Visual Design
- Calming color palette
- Generous whitespace
- Clear visual hierarchy
- Minimal distractions

### Cognitive Load Reduction
- Limited choices at each step
- One primary action per page
- Progressive disclosure (steps)
- No overwhelming information

### Positive UX
- Encouraging language
- No guilt or pressure
- Celebration of progress
- Forgiving interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting by route
- Lazy loading of components
- Optimized animations
- Minimal dependencies

## Development Tips

### Hot Reload
The development server supports hot reload. Changes to:
- JS/JSX files: Auto-reload
- CSS files: Auto-inject

### Debugging
- React DevTools recommended
- Console logs for API calls
- Error boundaries (to be added)

### Code Style
- Functional components with hooks
- Props destructuring
- Meaningful component names
- Comments for complex logic

## Future Enhancements

- [ ] Offline support with Service Workers
- [ ] Push notifications (optional)
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Drag and drop reordering
- [ ] Export tasks to calendar
- [ ] Voice input for task creation
