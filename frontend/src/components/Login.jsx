import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{cssStyles}</style>
      <div className="login-page">
        {/* Animated Background Elements */}
        <div className="bg-gradient"></div>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>

        <div className={`login-card ${mounted ? "login-card-visible" : ""}`}>
          {/* Logo / Brand */}
          <div className="login-brand">
            <div className="login-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-field">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-field">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`login-btn ${loading ? "login-btn-loading" : ""}`}
            >
              {loading ? (
                <span className="btn-loader">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                <span className="btn-content">
                  Sign In
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>or</span>
          </div>

          {/* Sign Up Link */}
          <p className="login-footer">
            Don't have an account?{" "}
            <a href="/signup" className="signup-link" onClick={(e) => { e.preventDefault(); navigate("/signup"); }}>
              Create Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: #06060e;
}

/* ─── BACKGROUND ─────────────────────────────── */
.bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 90, 255, 0.2), transparent),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(255, 80, 150, 0.12), transparent),
    radial-gradient(ellipse 50% 50% at 10% 80%, rgba(60, 120, 255, 0.1), transparent);
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  will-change: transform;
}
.bg-orb-1 {
  width: 600px; height: 600px;
  background: rgba(120, 80, 255, 0.12);
  top: -200px; right: -150px;
  animation: orbFloat1 20s ease-in-out infinite;
}
.bg-orb-2 {
  width: 400px; height: 400px;
  background: rgba(255, 60, 130, 0.08);
  bottom: -100px; left: -100px;
  animation: orbFloat2 25s ease-in-out infinite;
}
.bg-orb-3 {
  width: 300px; height: 300px;
  background: rgba(60, 180, 255, 0.08);
  top: 50%; left: 50%;
  animation: orbFloat3 18s ease-in-out infinite;
}
.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%);
}

@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(60px, 40px) rotate(120deg); }
  66% { transform: translate(-30px, -20px) rotate(240deg); }
}
@keyframes orbFloat2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(80px, -60px); }
}
@keyframes orbFloat3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-30%, -70%) scale(1.2); }
}

/* ─── CARD ─────────────────────────────────── */
.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 44px 36px 36px;
  position: relative;
  z-index: 10;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03) inset,
    0 30px 80px -20px rgba(0,0,0,0.5),
    0 0 120px -40px rgba(120,80,255,0.15);
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.login-card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ─── BRAND ────────────────────────────────── */
.login-brand {
  text-align: center;
  margin-bottom: 32px;
}
.login-logo {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c5cfc, #c850c0);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  box-shadow: 0 8px 30px -8px rgba(124, 92, 252, 0.5);
}
.login-title {
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}
.login-subtitle {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  margin: 0;
  font-weight: 400;
}

/* ─── ERROR ────────────────────────────────── */
.login-error {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 59, 48, 0.08);
  border: 1px solid rgba(255, 59, 48, 0.15);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 24px;
  color: #ff6b6b;
  font-size: 13px;
  font-weight: 500;
  animation: shakeError 0.4s ease-in-out;
}
@keyframes shakeError {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

/* ─── FORM ─────────────────────────────────── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.input-field {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 14px;
  color: rgba(255,255,255,0.25);
  transition: color 0.3s ease;
  pointer-events: none;
  flex-shrink: 0;
}
.input-field input {
  width: 100%;
  padding: 14px 16px 14px 46px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  color: #ffffff;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: all 0.3s ease;
}
.input-field input::placeholder {
  color: rgba(255,255,255,0.2);
}
.input-field input:focus {
  border-color: rgba(124, 92, 252, 0.5);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 4px rgba(124, 92, 252, 0.1), 0 0 20px -4px rgba(124, 92, 252, 0.15);
}
.input-field:focus-within .input-icon {
  color: #7c5cfc;
}
.toggle-password {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.25);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.toggle-password:hover {
  color: rgba(255,255,255,0.5);
}

/* ─── BUTTON ───────────────────────────────── */
.login-btn {
  width: 100%;
  padding: 15px 24px;
  background: linear-gradient(135deg, #7c5cfc 0%, #c850c0 100%);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: 4px;
}
.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.login-btn:hover:not(:disabled)::before {
  opacity: 1;
}
.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px -8px rgba(124, 92, 252, 0.4);
}
.login-btn:active:not(:disabled) {
  transform: translateY(0);
}
.login-btn-loading {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── DIVIDER ──────────────────────────────── */
.login-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 28px 0;
}
.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.06);
}
.login-divider span {
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

/* ─── FOOTER ───────────────────────────────── */
.login-footer {
  text-align: center;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  margin: 0;
}
.signup-link {
  color: #a78bfa;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.signup-link:hover {
  color: #c4b5fd;
  text-decoration: underline;
}

/* ─── RESPONSIVE ───────────────────────────── */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px 28px;
    border-radius: 20px;
  }
  .login-title {
    font-size: 22px;
  }
}
`;

export default Login;
