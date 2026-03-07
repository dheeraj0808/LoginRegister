import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { Mail, Lock, UserPlus, Github, Chrome, User, Eye, EyeOff } from 'lucide-react';

const Register = ({ onSwitch }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            alert("Registration successful!");
            navigate("/login");

        } catch (err) {
            setError(err.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass register-card" style={{ padding: '32px 40px', width: '100%', maxWidth: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '4px' }}>Create Account</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Join us and start your journey today.</p>
            </div>

            {error && (
                <div style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    background: 'rgba(239,68,68,0.15)',
                    color: '#ef4444',
                    border: `1px solid rgba(239,68,68,0.3)`
                }}>
                    {error}
                    setMessage({text: data.message, type: 'error' });
            }
        } catch (error) {
                        setMessage({ text: 'Server se connect nahi ho paya!', type: 'error' });
        } finally {
                        setLoading(false);
        }
    };

                    return (
                    <div className="glass register-card" style={{ padding: '32px 40px', width: '100%', maxWidth: '400px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '4px' }}>Create Account</h1>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Join us and start your journey today.</p>
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
                            <div className="input-group" style={{ marginBottom: '16px' }}>
                                <label htmlFor="name">Full Name</label>
                                <div className="input-wrapper">
                                    <input type="text" id="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                                    <User size={18} />
                                </div>
                            </div>

                            <div className="input-group" style={{ marginBottom: '16px' }}>
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <input type="email" id="email" placeholder="name@example.com" required value={formData.email} onChange={handleChange} />
                                    <Mail size={18} />
                                </div>
                            </div>

                            <div className="input-group" style={{ marginBottom: '16px' }}>
                                <label htmlFor="password">Password</label>
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

                            <div className="input-group" style={{ marginBottom: '20px' }}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-wrapper">
                                    <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="••••••••" required value={formData.confirmPassword} onChange={handleChange} />
                                    <Lock size={18} />
                                    <div
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            cursor: 'pointer',
                                            color: 'var(--text-dim)',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading}>
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    {loading ? 'Creating...' : 'Get Started'} <UserPlus size={18} />
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
