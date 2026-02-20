import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Login page se jo naam bheja gaya hai, wo yahan access hoga
    const userName = location.state?.userName || 'User';

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="glass login-card" style={{ padding: '40px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
            }}>
                <Home size={32} color="white" />
            </div>

            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #fff, #a5b4fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                Login Successfully! 🎉
            </h1>

            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '32px' }}>
                Welcome back, <span style={{ color: 'white', fontWeight: '600' }}>{userName}</span>. You are now securely logged in.
            </p>

            <button onClick={handleLogout} className="btn-primary" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fee2e2' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <LogOut size={18} /> Logout
                </span>
            </button>
        </div>
    );
};

export default Dashboard;
