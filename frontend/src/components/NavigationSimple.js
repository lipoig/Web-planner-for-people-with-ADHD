import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

function NavigationSimple() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear token
    localStorage.removeItem('token');
    
    // Force reload to login page
    window.location.href = '/';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">✓</span>
          <span className="brand-text">ADHD Planner</span>
        </div>

        <div className="nav-links">
          <button
            className={`nav-link ${isActive('/today') ? 'active' : ''}`}
            onClick={() => navigate('/today')}
          >
            Today
          </button>
          <button
            className={`nav-link ${isActive('/all-tasks') ? 'active' : ''}`}
            onClick={() => navigate('/all-tasks')}
          >
            All Tasks
          </button>
        </div>

        <div className="nav-actions">
          <button 
            className="btn-logout-direct" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationSimple;
