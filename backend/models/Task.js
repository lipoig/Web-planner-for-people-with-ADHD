const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  }
});

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  steps: [stepSchema],
  completed: {
    type: Boolean,
    default: false
  },
  isToday: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
});

// Add index for efficient querying
taskSchema.index({ userId: 1, completed: 1, isToday: 1 });

module.exports = mongoose.model('Task', taskSchema);
