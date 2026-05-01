import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import Navigation from './components/Navigation';

function PrivateRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to="/" />;
}

function PublicRoute({ children }) {
  return !authService.isAuthenticated() ? children : <Navigate to="/today" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Welcome />
            </PublicRoute>
          }
        />
        <Route
          path="/today"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/all-tasks"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <AllTasks />
              </>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
