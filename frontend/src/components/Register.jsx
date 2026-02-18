import React from 'react';
import { Mail, Lock, UserPlus, Github, Chrome, User } from 'lucide-react';

const Register = ({ onSwitch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register submitted');
    };

    return (
        <div className="glass register-card" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Create Account</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Join us and start your journey today.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-wrapper">
                        <input type="text" id="name" placeholder="John Doe" required />
                        <User size={18} />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-wrapper">
                        <input type="email" id="email" placeholder="name@example.com" required />
                        <Mail size={18} />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                        <input type="password" id="password" placeholder="••••••••" required />
                        <Lock size={18} />
                    </div>
                </div>

                <button type="submit" className="btn-primary">
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Get Started <UserPlus size={18} />
                    </span>
                </button>
            </form>

            <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-white)' }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Or join with</span>
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
                Already have an account? <span onClick={onSwitch}>Sign in instead</span>
            </p>
        </div>
    );
};

export default Register;
