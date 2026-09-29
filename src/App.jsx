import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { generateToken, decodeToken } from './utils/jwt';
import './App.css';

/**
 * App Component
 * 
 * Controls:
 * - Authentication state persistence with localStorage
 * - Credential verification & JWT generation
 * - Protected route / conditional UI rendering
 * - Logout handler
 */
function App() {
  // Read initial token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  // Derive authenticated user directly from token (idiomatic React without unnecessary effects)
  const user = token ? decodeToken(token) : null;

  /**
   * Handle Login submission
   * Validates credentials, creates simulated JWT, and saves to localStorage
   */
  const handleLogin = (username, password) => {
    // Simulated credential database as per experiment requirements
    let authenticatedUser = null;

    if (username.toLowerCase() === 'admin' && password === '1234') {
      authenticatedUser = {
        userId: 101,
        username: 'admin',
        role: 'Admin'
      };
    } else if (username.toLowerCase() === 'student' && password === '1234') {
      authenticatedUser = {
        userId: 102,
        username: 'student',
        role: 'Student'
      };
    } else if (username.toLowerCase() === 'user' && password === '1234') {
      authenticatedUser = {
        userId: 103,
        username: 'user',
        role: 'User'
      };
    }

    if (authenticatedUser) {
      // 1. Generate Simulated JWT Token
      const newToken = generateToken(authenticatedUser);

      // 2. Store in browser localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('role', authenticatedUser.role);

      // 3. Update React Authentication State
      setToken(newToken);

      return { success: true };
    }

    // Invalid credentials response
    return {
      success: false,
      message: 'Invalid username or password. (Hint: admin / 1234)'
    };
  };

  /**
   * Handle Logout
   * Removes token & role from storage, resets state to return to login screen
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
  };

  // Check if we have an active, valid authenticated session
  const isAuthenticated = Boolean(token && user);

  return (
    <div className="app-root">
      {/* Top Header Bar */}
      <nav className="global-header">
        <div className="header-inner">
          <div className="header-title-box">
            <span className="header-badge">Part B Practical</span>
            <span className="header-app-name">JWT Authentication System</span>
          </div>
          <div className="header-status">
            <span className={`status-pill ${isAuthenticated ? 'online' : 'offline'}`}>
              <span className="status-bullet"></span>
              {isAuthenticated ? 'Authenticated (Token Present)' : 'Guest (No Token)'}
            </span>
          </div>
        </div>
      </nav>

      {/* Main View Area: Protected UI Logic */}
      <div className="app-main-viewport">
        {isAuthenticated ? (
          <Dashboard user={user} token={token} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>

      {/* Footer with Lab / Viva Summary */}
      <footer className="global-footer">
        <div className="footer-inner">
          <span className="footer-concept">
            <strong>Key Concepts Demonstrated:</strong> Authentication &bull; JWT Generation (Header.Payload.Sig) &bull; Token Storage (localStorage) &bull; Protected UI Access Control &bull; Logout
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
