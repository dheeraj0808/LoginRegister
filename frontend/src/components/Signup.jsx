import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <>
      <style>{cssStyles}</style>
      <div className="signup-page">
        <div className="bg-gradient"></div>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>

        <div className={`signup-card ${mounted ? "signup-card-visible" : ""}`}>
          {/* Brand */}
          <div className="signup-brand">
            <div className="signup-logo">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </div>
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Join us today and get started</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="signup-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="signup-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="signup-form">
            {/* Name */}
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <div className="field-input">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="field-input">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-input">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="field-group">
              <label className="field-label">Confirm Password</label>
              <div className="field-input">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="toggle-pw" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`signup-btn ${loading ? "signup-btn-loading" : ""}`}
            >
              {loading ? (
                <span className="btn-loader">
                  <span className="spinner"></span>
                  Creating Account...
                </span>
              ) : (
                <span className="btn-content">
                  Create Account
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="signup-divider"><span>or</span></div>

          {/* Login Link */}
          <p className="signup-footer">
            Already have an account?{" "}
            <a href="/login" className="login-link" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
  background: #06060e;
}

.signup-page .bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(200,80,192,0.18), transparent),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(79,172,254,0.1), transparent),
    radial-gradient(ellipse 50% 50% at 10% 80%, rgba(124,92,252,0.1), transparent);
}
.signup-page .bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  will-change: transform;
}
.signup-page .bg-orb-1 {
  width: 500px; height: 500px;
  background: rgba(200,80,192,0.1);
  top: -150px; left: -100px;
  animation: sOrbFloat1 20s ease-in-out infinite;
}
.signup-page .bg-orb-2 {
  width: 400px; height: 400px;
  background: rgba(79,172,254,0.08);
  bottom: -100px; right: -100px;
  animation: sOrbFloat2 24s ease-in-out infinite;
}
.signup-page .bg-orb-3 {
  width: 300px; height: 300px;
  background: rgba(124,92,252,0.08);
  top: 60%; left: 50%;
  animation: sOrbFloat3 18s ease-in-out infinite;
}
.signup-page .bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%);
}

@keyframes sOrbFloat1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(50px, 30px); }
  66% { transform: translate(-30px, -20px); }
}
@keyframes sOrbFloat2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-60px, 40px); }
}
@keyframes sOrbFloat3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-30%, -70%) scale(1.15); }
}

.signup-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 40px 36px 32px;
  position: relative;
  z-index: 10;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03) inset,
    0 30px 80px -20px rgba(0,0,0,0.5),
    0 0 120px -40px rgba(200,80,192,0.12);
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.signup-card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.signup-brand {
  text-align: center;
  margin-bottom: 28px;
}
.signup-logo {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #c850c0, #4facfe);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  color: white;
  box-shadow: 0 8px 30px -8px rgba(200,80,192,0.5);
}
.signup-title {
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}
.signup-subtitle {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  margin: 0;
}

.signup-error {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,59,48,0.08);
  border: 1px solid rgba(255,59,48,0.15);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  color: #ff6b6b;
  font-size: 13px;
  font-weight: 500;
  animation: shakeErr 0.4s ease-in-out;
}
.signup-success {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(67,233,123,0.08);
  border: 1px solid rgba(67,233,123,0.15);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  color: #43e97b;
  font-size: 13px;
  font-weight: 500;
}
@keyframes shakeErr {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.field-input {
  position: relative;
  display: flex;
  align-items: center;
}
.field-icon {
  position: absolute;
  left: 14px;
  color: rgba(255,255,255,0.25);
  transition: color 0.3s ease;
  pointer-events: none;
}
.field-input input {
  width: 100%;
  padding: 14px 16px 14px 46px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  color: #ffffff;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: all 0.3s ease;
}
.field-input input::placeholder {
  color: rgba(255,255,255,0.2);
}
.field-input input:focus {
  border-color: rgba(200,80,192,0.5);
  background: rgba(255,255,255,0.06);
  box-shadow: 0 0 0 4px rgba(200,80,192,0.1), 0 0 20px -4px rgba(200,80,192,0.15);
}
.field-input:focus-within .field-icon {
  color: #c850c0;
}
.toggle-pw {
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
.toggle-pw:hover {
  color: rgba(255,255,255,0.5);
}

.signup-btn {
  width: 100%;
  padding: 15px 24px;
  background: linear-gradient(135deg, #c850c0 0%, #4facfe 100%);
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
.signup-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.signup-btn:hover:not(:disabled)::before {
  opacity: 1;
}
.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px -8px rgba(200,80,192,0.35);
}
.signup-btn:active:not(:disabled) {
  transform: translateY(0);
}
.signup-btn-loading {
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

.signup-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}
.signup-divider::before,
.signup-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.06);
}
.signup-divider span {
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

.signup-footer {
  text-align: center;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  margin: 0;
}
.login-link {
  color: #c4b5fd;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.login-link:hover {
  color: #e0d9ff;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signup-card {
    padding: 32px 24px 28px;
    border-radius: 20px;
  }
  .signup-title {
    font-size: 22px;
  }
}
`;

export default Signup;
