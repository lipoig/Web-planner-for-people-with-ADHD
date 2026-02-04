import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { taskService } from '../services/api';
import './TaskModal.css';

function TaskModal({ task, onClose, onSave }) {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isToday, setIsToday] = useState(true);
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setPriority(task.priority);
      setIsToday(task.isToday);
      setSteps(task.steps || []);
    }
  }, [task]);

  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, { text: newStep.trim(), completed: false, order: steps.length }]);
      setNewStep('');
    }
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    setSaving(true);
    try {
      const taskData = {
        name: name.trim(),
        priority,
        isToday,
        steps: steps.map((step, index) => ({
          ...step,
          order: index
        }))
      };

      if (task) {
        await taskService.updateTask(task._id, taskData);
      } else {
        await taskService.createTask(taskData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{task ? 'Edit Task' : 'Create Task'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-section">
            <label className="form-label">Task Name *</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What do you need to do?"
              autoFocus
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">Priority</label>
            <div className="priority-buttons">
              <button
                type="button"
                className={`priority-btn low ${priority === 'low' ? 'active' : ''}`}
                onClick={() => setPriority('low')}
              >
                Low
              </button>
              <button
                type="button"
                className={`priority-btn medium ${priority === 'medium' ? 'active' : ''}`}
                onClick={() => setPriority('medium')}
              >
                Medium
              </button>
              <button
                type="button"
                className={`priority-btn high ${priority === 'high' ? 'active' : ''}`}
                onClick={() => setPriority('high')}
              >
                High
              </button>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">When?</label>
            <div className="when-buttons">
              <button
                type="button"
                className={`when-btn ${isToday ? 'active' : ''}`}
                onClick={() => setIsToday(true)}
              >
                Today
              </button>
              <button
                type="button"
                className={`when-btn ${!isToday ? 'active' : ''}`}
                onClick={() => setIsToday(false)}
              >
                Later
              </button>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Steps (optional)</label>
            
            <div className="step-input-group">
              <input
                type="text"
                className="form-input"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStep())}
                placeholder="Add a step..."
              />
              <button
                type="button"
                className="btn-add-step"
                onClick={handleAddStep}
                disabled={!newStep.trim()}
              >
                Add
              </button>
            </div>

            <AnimatePresence>
              {steps.length > 0 && (
                <motion.div
                  className="steps-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="step-item-edit"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <span className="step-number">{index + 1}.</span>
                      <span className="step-text-edit">{step.text}</span>
                      <button
                        type="button"
                        className="btn-remove-step"
                        onClick={() => handleRemoveStep(index)}
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving || !name.trim()}
            >
              {saving ? 'Saving...' : task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default TaskModal;
