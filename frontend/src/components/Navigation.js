import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = (e) => {
    // Prevent any default behavior
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Logout clicked!'); // Debug message
    
    // Clear the token
    localStorage.removeItem('token');
    
    // Close menu
    setShowMenu(false);
    
    // Redirect to login
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
            className="nav-menu-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            ⋮
          </button>
        </div>

        {showMenu && (
          <div className="nav-dropdown">
            <button 
              className="dropdown-item logout" 
              onClick={handleLogout}
              onMouseDown={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showMenu && (
        <div 
          className="nav-backdrop" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </nav>
  );
}

export default Navigation;
