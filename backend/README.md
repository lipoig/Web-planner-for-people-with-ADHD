# ADHD Planner Backend

Express.js backend API for the ADHD Planner application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `PORT`: Server port (default: 5000)

3. Start MongoDB:
```bash
# If using local MongoDB
mongod
```

4. Run the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Documentation

### Authentication

#### POST /api/auth/start
Unified endpoint for both login and registration.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (New User):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "isNewUser": true
}
```

**Response (Existing User):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "isNewUser": false
}
```

### Tasks

All task endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### GET /api/tasks/today
Get today's active tasks (max 5, sorted by priority).

**Response:**
```json
[
  {
    "_id": "task_id",
    "userId": "user_id",
    "name": "Complete project",
    "priority": "high",
    "steps": [
      {
        "text": "Research",
        "completed": false,
        "order": 0
      }
    ],
    "completed": false,
    "isToday": true,
    "createdAt": "2026-02-01T10:00:00.000Z"
  }
]
```

#### GET /api/tasks/all?filter=today|later
Get all active tasks with optional filter.

**Query Parameters:**
- `filter` (optional): "today" or "later"

#### GET /api/tasks/stats
Get task completion statistics for today.

**Response:**
```json
{
  "total": 5,
  "completed": 2
}
```

#### POST /api/tasks
Create a new task.

**Request:**
```json
{
  "name": "Buy groceries",
  "priority": "medium",
  "isToday": true,
  "steps": [
    {
      "text": "Make shopping list",
      "completed": false,
      "order": 0
    }
  ]
}
```

#### PUT /api/tasks/:id
Update a task.

**Request:**
```json
{
  "name": "Updated task name",
  "priority": "low",
  "isToday": false,
  "steps": [...],
  "completed": false
}
```

#### PATCH /api/tasks/:id/toggle
Toggle task completion status.

**Response:**
```json
{
  "_id": "task_id",
  "completed": true,
  "completedAt": "2026-02-01T14:30:00.000Z",
  ...
}
```

#### DELETE /api/tasks/:id
Delete a task.

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Database Schema

### User
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date
}
```

### Task
```javascript
{
  userId: ObjectId (ref: User, required),
  name: String (required),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  steps: [{
    text: String (required),
    completed: Boolean (default: false),
    order: Number (required)
  }],
  completed: Boolean (default: false),
  isToday: Boolean (default: true),
  createdAt: Date,
  completedAt: Date
}
```

## Security

- Passwords are hashed using bcryptjs (10 salt rounds)
- JWT tokens expire after 7 days
- All task endpoints require valid JWT authentication
- Email validation on registration
- Password minimum length: 6 characters

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Server Error

Error responses follow this format:
```json
{
  "message": "Error description"
}
```

Validation errors:
```json
{
  "errors": [
    {
      "msg": "Email is invalid",
      "param": "email"
    }
  ]
}
```

## Development

The backend uses:
- Express.js for routing
- Mongoose for MongoDB ODM
- express-validator for input validation
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Testing

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/start \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
