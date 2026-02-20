import React, { useState } from 'react';
import { Mail, Lock, LogIn, Github, Chrome, Eye, EyeOff } from 'lucide-react';

const Login = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ text: `${data.message} Welcome, ${data.user.name}!`, type: 'success' });
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Server se connect nahi ho paya!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass login-card" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Please enter your details to sign in.</p>
      </div>

      {message.text && (
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '0.85rem',
          fontWeight: 500,
          background: message.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          color: message.type === 'success' ? '#22c55e' : '#ef4444',
          border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <input type="email" id="email" placeholder="name@example.com" required value={formData.email} onChange={handleChange} />
            <Mail size={18} />
          </div>
        </div>

        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
          </div>
          <div className="input-wrapper">
            <input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" required value={formData.password} onChange={handleChange} />
            <Lock size={18} />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                cursor: 'pointer',
                color: 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {loading ? 'Signing In...' : 'Sign In'} <LogIn size={18} />
          </span>
        </button>
      </form>

      <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-white)' }}></div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Or continue with</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-white)' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="glass" style={{ flex: 1, padding: '12px', display: 'flex', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'var(--transition)' }}>
          <Github size={20} />
        </button>
        <button className="glass" style={{ flex: 1, padding: '12px', display: 'flex', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'var(--transition)' }}>
          <Chrome size={20} />
        </button>
      </div>

      <p className="link-text">
        Don't have an account? <span onClick={onSwitch}>Sign up for free</span>
      </p>
    </div>
  );
};

export default Login;
