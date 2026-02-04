import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { taskService } from '../services/api';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const tasksData = await taskService.getTodayTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      await taskService.toggleTask(taskId);
      await loadData();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setConfirmDelete(null);
      await loadData();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSaveTask = async () => {
    await loadData();
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

  const toggleSteps = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleToggleStep = async (task, stepIndex) => {
    const updatedSteps = [...task.steps];
    updatedSteps[stepIndex].completed = !updatedSteps[stepIndex].completed;
    
    try {
      await taskService.updateTask(task._id, { steps: updatedSteps });
      await loadData();
    } catch (error) {
      console.error('Error updating step:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Priority order: high -> medium -> low
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  // Sort tasks by priority and show only top 3
  const visibleTasks = [...tasks]
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    .slice(0, 3);

  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="dashboard-header">
          <motion.h1
            className="dashboard-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            What you can do today
          </motion.h1>
          
          <motion.p
            className="dashboard-date"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </motion.p>
        </header>

        <div className="task-list">
          <AnimatePresence mode="popLayout">
            {visibleTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className="task-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <div className="task-main">
                  <button
                    className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => handleToggleTask(task._id)}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
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

                  <div className="task-content">
                    <div className="task-header-row">
                      <h3 className={`task-name ${task.completed ? 'completed' : ''}`}>
                        {task.name}
                      </h3>
                      <div
                        className="task-priority"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      />
                    </div>
                    
                    {task.steps && task.steps.length > 0 && (
                      <button
                        className="task-steps-toggle"
                        onClick={() => toggleSteps(task._id)}
                      >
                        {task.steps.filter(s => s.completed).length} / {task.steps.length} steps
                        <span className={`toggle-arrow ${expandedTask === task._id ? 'expanded' : ''}`}>
                          ▼
                        </span>
                      </button>
                    )}
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

                <AnimatePresence>
                  {expandedTask === task._id && task.steps && task.steps.length > 0 && (
                    <motion.div
                      className="task-steps"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {task.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="step-item">
                          <button
                            className={`step-checkbox ${step.completed ? 'checked' : ''}`}
                            onClick={() => handleToggleStep(task, stepIndex)}
                          />
                          <span className={`step-text ${step.completed ? 'completed' : ''}`}>
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="empty-message">No tasks for today yet.</p>
              <p className="empty-hint">Click the button below to add your first task!</p>
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
      </motion.div>

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

export default Dashboard;
