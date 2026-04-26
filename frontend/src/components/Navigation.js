import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Apply theme on mount and whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem('token');
    setShowMenu(false);
    window.location.href = '/';
  };

  const toggleTheme = (e) => {
    e.stopPropagation();
    setIsDark(prev => !prev);
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
          {/* Theme toggle */}
          <button
            className="nav-theme-btn"
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Menu button */}
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
