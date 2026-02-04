const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/tasks/today - Get today's tasks (max 5, frontend displays top 3 by priority)
router.get('/today', async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
      completed: false,
      isToday: true
    });

    // Sort by priority (high > medium > low) then by creation date
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    tasks.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    // Return max 5 tasks
    const limitedTasks = tasks.slice(0, 5);

    res.json(limitedTasks);
  } catch (error) {
    console.error('Error fetching today tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tasks/all - Get all active tasks
router.get('/all', async (req, res) => {
  try {
    const { filter } = req.query; // 'today', 'later', or undefined (all)
    
    let query = {
      userId: req.userId,
      completed: false
    };

    if (filter === 'today') {
      query.isToday = true;
    } else if (filter === 'later') {
      query.isToday = false;
    }

    const tasks = await Task.find(query).sort({ priority: -1, createdAt: 1 });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tasks/stats - Get progress stats
router.get('/stats', async (req, res) => {
  try {
    const total = await Task.countDocuments({
      userId: req.userId,
      isToday: true,
      completed: false
    });

    const completed = await Task.countDocuments({
      userId: req.userId,
      isToday: true,
      completed: true,
      completedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    res.json({ total, completed });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks - Create new task
router.post('/', [
  body('name').trim().notEmpty().withMessage('Task name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, priority, steps, isToday } = req.body;

    const task = new Task({
      userId: req.userId,
      name,
      priority: priority || 'medium',
      steps: steps || [],
      isToday: isToday !== undefined ? isToday : true
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const { name, priority, steps, isToday, completed } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields
    if (name !== undefined) task.name = name;
    if (priority !== undefined) task.priority = priority;
    if (steps !== undefined) task.steps = steps;
    if (isToday !== undefined) task.isToday = isToday;
    if (completed !== undefined) {
      task.completed = completed;
      task.completedAt = completed ? new Date() : null;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date() : null;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
