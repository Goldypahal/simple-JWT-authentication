import { useState } from 'react';
import { getFullTokenDetails } from '../utils/jwt';

/**
 * Dashboard Component (Protected Route UI)
 * 
 * Features:
 * 1. User welcome message and authenticated role badge
 * 2. Visual JWT inspection (Header, Payload, Signature in RFC standard colors)
 * 3. LocalStorage persistence viewer
 * 4. Role-based privilege card
 * 5. Logout action that clears authentication tokens
 */
function Dashboard({ user, token, onLogout }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('payload');

  const tokenDetails = getFullTokenDetails(token);
  const storedRole = localStorage.getItem('role') || user?.role || 'User';

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (epochSec) => {
    if (!epochSec) return 'N/A';
    return new Date(epochSec * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="dashboard-nav">
        <div className="nav-brand">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h2 className="nav-title">Protected Dashboard</h2>
            <span className="nav-subtitle">JWT Authenticated Session</span>
          </div>
        </div>

        <div className="nav-actions">
          <div className="user-pill">
            <span className="user-avatar">{user?.username ? user.username[0].toUpperCase() : 'U'}</span>
            <span className="user-name">{user?.username || 'User'}</span>
            <span className={`role-tag role-${(user?.role || 'user').toLowerCase()}`}>
              {user?.role || 'User'}
            </span>
          </div>
          <button
            id="logout-btn"
            type="button"
            className="logout-button"
            onClick={onLogout}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="dashboard-content">
        {/* Welcome Banner */}
        <section className="welcome-banner">
          <div className="welcome-info">
            <span className="status-indicator">
              <span className="status-ping"></span>
              <span className="status-dot"></span>
              Authenticated Successfully
            </span>
            <h1 className="welcome-heading">
              Welcome, <span className="highlight-text">{user?.username || 'Authenticated User'}</span>!
            </h1>
            <p className="welcome-desc">
              You are currently viewing a <strong>Protected Route</strong>. Access was granted because a valid simulated JSON Web Token was found and verified in your browser storage.
            </p>
          </div>
          <div className="role-showcase-card">
            <div className="role-showcase-label">Assigned Role</div>
            <div className={`role-showcase-value role-color-${(user?.role || 'user').toLowerCase()}`}>
              {user?.role || 'Standard User'}
            </div>
            <div className="role-user-id">User ID: #{user?.userId || 'N/A'}</div>
          </div>
        </section>

        {/* Experiment Concept Highlights */}
        <div className="concept-cards-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <div className="stat-title">1. Authentication</div>
              <div className="stat-value">Active &amp; Verified</div>
              <p className="stat-note">Credentials verified successfully</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <div className="stat-title">2. JWT Token</div>
              <div className="stat-value">Simulated HS256</div>
              <p className="stat-note">Base64Url Header.Payload.Sig</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div>
              <div className="stat-title">3. Token Storage</div>
              <div className="stat-value">localStorage</div>
              <p className="stat-note">Persisted across page reloads</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div className="stat-title">4. Protected UI</div>
              <div className="stat-value">Role: {storedRole}</div>
              <p className="stat-note">Access gated by token existence</p>
            </div>
          </div>
        </div>

        {/* Detailed JWT Inspection Panel */}
        <section className="jwt-inspector-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">JWT Information &amp; Token Breakdown</h2>
              <p className="section-desc">
                Standard JSON Web Token composition: <code>Header.Payload.Signature</code>
              </p>
            </div>
            <button
              type="button"
              className="copy-token-btn"
              onClick={handleCopyToken}
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied Token!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy Full JWT
                </>
              )}
            </button>
          </div>

          {/* Visual 3-part token banner */}
          <div className="token-visual-box">
            <div className="token-parts-legend">
              <span className="legend-tag legend-header">Header</span>
              <span className="legend-dot">.</span>
              <span className="legend-tag legend-payload">Payload</span>
              <span className="legend-dot">.</span>
              <span className="legend-tag legend-signature">Signature</span>
            </div>
            <div className="token-raw-display">
              <span className="token-part token-header-color" title="Header (Algorithm & Token Type)">
                {tokenDetails?.parts?.headerPart || 'header'}
              </span>
              <span className="token-separator">.</span>
              <span className="token-part token-payload-color" title="Payload (User ID, Role, Timestamps)">
                {tokenDetails?.parts?.payloadPart || 'payload'}
              </span>
              <span className="token-separator">.</span>
              <span className="token-part token-sig-color" title="Signature (Integrity Verification)">
                {tokenDetails?.parts?.signaturePart || 'signature'}
              </span>
            </div>
          </div>

          {/* Decoded Views Tabs */}
          <div className="inspector-tabs-container">
            <div className="inspector-tab-buttons">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'payload' ? 'active' : ''}`}
                onClick={() => setActiveTab('payload')}
              >
                Decoded Payload
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'header' ? 'active' : ''}`}
                onClick={() => setActiveTab('header')}
              >
                Decoded Header
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`}
                onClick={() => setActiveTab('storage')}
              >
                Browser Storage (localStorage)
              </button>
            </div>

            <div className="inspector-tab-content">
              {activeTab === 'payload' && (
                <div className="tab-pane">
                  <div className="table-responsive">
                    <table className="info-table">
                      <thead>
                        <tr>
                          <th>Claim / Field</th>
                          <th>Value</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>userId</code></td>
                          <td><span className="badge-code">{user?.userId || tokenDetails?.payload?.userId}</span></td>
                          <td>Unique user identifier encoded in token</td>
                        </tr>
                        <tr>
                          <td><code>username</code></td>
                          <td><strong>{user?.username || tokenDetails?.payload?.username}</strong></td>
                          <td>Authenticated username</td>
                        </tr>
                        <tr>
                          <td><code>role</code></td>
                          <td>
                            <span className={`role-badge role-${(user?.role || '').toLowerCase()}`}>
                              {user?.role || tokenDetails?.payload?.role}
                            </span>
                          </td>
                          <td>Security role for role-based access control (RBAC)</td>
                        </tr>
                        <tr>
                          <td><code>iat</code></td>
                          <td>
                            {tokenDetails?.payload?.iat ? (
                              <span>
                                {tokenDetails.payload.iat} <span className="time-hint">({formatDate(tokenDetails.payload.iat)})</span>
                              </span>
                            ) : 'N/A'}
                          </td>
                          <td>Issued At timestamp (standard JWT claim)</td>
                        </tr>
                        <tr>
                          <td><code>exp</code></td>
                          <td>
                            {tokenDetails?.payload?.exp ? (
                              <span>
                                {tokenDetails.payload.exp} <span className="time-hint">({formatDate(tokenDetails.payload.exp)})</span>
                              </span>
                            ) : 'N/A'}
                          </td>
                          <td>Expiration timestamp (standard JWT claim)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="code-preview-box">
                    <div className="code-label">JSON Representation:</div>
                    <pre className="code-block">
                      {JSON.stringify(tokenDetails?.payload || user, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'header' && (
                <div className="tab-pane">
                  <div className="table-responsive">
                    <table className="info-table">
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Value</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>alg</code></td>
                          <td><span className="badge-code">HS256</span></td>
                          <td>Algorithm used for signature (HMAC SHA-256)</td>
                        </tr>
                        <tr>
                          <td><code>typ</code></td>
                          <td><span className="badge-code">JWT</span></td>
                          <td>Token Type</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="code-preview-box">
                    <div className="code-label">Header JSON:</div>
                    <pre className="code-block">
                      {JSON.stringify(tokenDetails?.header || { alg: 'HS256', typ: 'JWT' }, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'storage' && (
                <div className="tab-pane">
                  <div className="table-responsive">
                    <table className="info-table">
                      <thead>
                        <tr>
                          <th>localStorage Key</th>
                          <th>Stored Value</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>localStorage.getItem("token")</code></td>
                          <td className="storage-token-cell">
                            <code>{localStorage.getItem('token') || 'None'}</code>
                          </td>
                          <td><span className="badge-status-ok">Active</span></td>
                        </tr>
                        <tr>
                          <td><code>localStorage.getItem("role")</code></td>
                          <td>
                            <span className="badge-code">{localStorage.getItem('role') || 'None'}</span>
                          </td>
                          <td><span className="badge-status-ok">Stored</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="storage-note">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>
                      When you click <strong>Logout</strong>, both <code>token</code> and <code>role</code> will be removed via <code>localStorage.removeItem()</code>, resetting authentication state and redirecting back to the login screen.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Role Privileges Card */}
        <section className="role-permissions-section">
          <h3 className="sub-section-title">
            Role-Based Access Control (RBAC) Demonstration
          </h3>
          <div className="permissions-grid">
            <div className="permission-item active">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>View Protected Dashboard</strong>
                <p>Available to all authenticated users with valid JWT.</p>
              </div>
            </div>
            <div className="permission-item active">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>Inspect Decoded JWT Token</strong>
                <p>Verify payload claims, user ID, and expiration.</p>
              </div>
            </div>
            <div className={`permission-item ${user?.role === 'Admin' ? 'active' : 'disabled'}`}>
              <span className="check-icon">{user?.role === 'Admin' ? '✓' : '✗'}</span>
              <div>
                <strong>System Administrator Privileges</strong>
                <p>
                  {user?.role === 'Admin' 
                    ? 'Granted! You have full administrative access.' 
                    : 'Restricted: Requires Role="Admin". Log in as admin to unlock.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
