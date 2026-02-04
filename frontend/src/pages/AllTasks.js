import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { taskService } from '../services/api';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import './AllTasks.css';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'later'
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const filterParam = filter === 'all' ? undefined : filter;
      const data = await taskService.getAllTasks(filterParam);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleToggleTask = async (taskId) => {
    try {
      await taskService.toggleTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setConfirmDelete(null);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSaveTask = async () => {
    await loadTasks();
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'var(--color-low)',
      medium: 'var(--color-medium)',
      high: 'var(--color-high)',
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    };
    return labels[priority] || 'Medium';
  };

  const filteredTasks = tasks;

  if (loading) {
    return (
      <div className="alltasks-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="alltasks-container">
      <div className="alltasks-content">
        <header className="alltasks-header">
          <button
            className="btn-back"
            onClick={() => navigate('/today')}
          >
            ← Back to Today
          </button>

          <h1 className="alltasks-title">All Tasks</h1>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
              onClick={() => setFilter('today')}
            >
              Today
            </button>
            <button
              className={`filter-btn ${filter === 'later' ? 'active' : ''}`}
              onClick={() => setFilter('later')}
            >
              Later
            </button>
          </div>
        </header>

        <div className="alltasks-list">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className="alltask-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <div className="alltask-main">
                  <button
                    className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => handleToggleTask(task._id)}
                  >
                    {task.completed && (
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <path
                          d="M3 8L6 11L13 4"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </button>

                  <div className="alltask-content">
                    <h3 className={`task-name ${task.completed ? 'completed' : ''}`}>
                      {task.name}
                    </h3>
                    
                    <div className="alltask-meta">
                      <span
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {getPriorityLabel(task.priority)}
                      </span>
                      {task.steps && task.steps.length > 0 && (
                        <span className="steps-badge">
                          {task.steps.filter(s => s.completed).length}/{task.steps.length} steps
                        </span>
                      )}
                      <span className={`when-badge ${task.isToday ? 'today' : 'later'}`}>
                        {task.isToday ? 'Today' : 'Later'}
                      </span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      className="task-action-btn"
                      onClick={() => handleEditTask(task)}
                      title="Edit task"
                    >
                      ✎
                    </button>
                    <button
                      className="task-action-btn delete"
                      onClick={() => setConfirmDelete(task)}
                      title="Delete task"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTasks.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="empty-message">
                {filter === 'all' && 'No tasks yet.'}
                {filter === 'today' && 'No tasks scheduled for today.'}
                {filter === 'later' && 'No tasks scheduled for later.'}
              </p>
              <p className="empty-hint">Add a task to get started!</p>
            </motion.div>
          )}
        </div>

        <motion.button
          className="btn-add-task"
          onClick={() => {
            setEditingTask(null);
            setShowTaskModal(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="btn-icon">+</span>
          Add Task
        </motion.button>
      </div>

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Delete task?"
          message={`Are you sure you want to delete "${confirmDelete.name}"?`}
          onConfirm={() => handleDeleteTask(confirmDelete._id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

export default AllTasks;
