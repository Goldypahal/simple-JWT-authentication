import { useState } from 'react';

/**
 * Login Component
 * 
 * Provides:
 * - Username and Password input fields
 * - Interactive login trigger
 * - Error message display on invalid credentials
 * - One-click demo credentials for easy lab evaluation
 */
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please fill in both username and password.');
      return;
    }

    setIsLoading(true);
    // Simulate brief network delay for realistic authentication UX
    setTimeout(() => {
      const result = onLogin(username.trim(), password.trim());
      if (!result.success) {
        setErrorMessage(result.message || 'Invalid username or password');
      }
      setIsLoading(false);
    }, 300);
  };

  const handleQuickFill = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header Badge & Title */}
        <div className="auth-header">
          <div className="auth-badge">
            <span className="badge-dot"></span>
            Part B — Lab MST Practical
          </div>
          <h1 className="auth-title">JWT Authentication</h1>
          <p className="auth-subtitle">
            Sign in to generate a simulated JSON Web Token & access the protected Dashboard
          </p>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="alert-box alert-error" id="login-error" role="alert">
            <svg
              className="alert-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div className="alert-content">
              <strong>Authentication Failed</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="username-input" className="form-label">
              Username
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="username-input"
                type="text"
                className="form-input"
                placeholder="Enter username (e.g. admin)"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password-input" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter password (e.g. 1234)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="login-btn"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-text">
                <span className="spinner"></span> Verifying Credentials...
              </span>
            ) : (
              <span>Sign In &amp; Generate JWT &rarr;</span>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials for Lab Testing */}
        <div className="demo-credentials-card">
          <div className="demo-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Simulated Lab Credentials (Click to Autofill):
          </div>
          <div className="demo-buttons-group">
            <button
              type="button"
              className="chip-btn admin-chip"
              onClick={() => handleQuickFill('admin', '1234')}
            >
              <span className="chip-role">Admin</span>
              <code>admin / 1234</code>
            </button>
            <button
              type="button"
              className="chip-btn user-chip"
              onClick={() => handleQuickFill('student', '1234')}
            >
              <span className="chip-role">Student</span>
              <code>student / 1234</code>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
