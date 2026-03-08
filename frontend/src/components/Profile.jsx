import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "" });
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await getProfile(token);
      setProfile(data.user);
      setEditForm({ name: data.user.name || "", email: data.user.email || "", password: "" });
      setTimeout(() => setMounted(true), 100);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
      localStorage.clear();
      setTimeout(() => navigate("/login"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {};
      if (editForm.name && editForm.name !== profile.name) payload.name = editForm.name;
      if (editForm.email && editForm.email !== profile.email) payload.email = editForm.email;
      if (editForm.password) payload.password = editForm.password;

      if (Object.keys(payload).length === 0) {
        showToast("No changes to update", "info");
        setSaving(false);
        return;
      }

      const data = await updateProfile(token, payload);
      setProfile(data.user);
      setEditForm({ name: data.user.name, email: data.user.email, password: "" });
      setEditing(false);
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      showToast(err.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm({ name: profile?.name || "", email: profile?.email || "", password: "" });
    setEditing(false);
    setShowPassword(false);
  };

  const showToast = (msg, type) => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "" }), 3500);
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const getGradient = (name) => {
    const g = [
      ["#7c5cfc","#c850c0"],["#4facfe","#00f2fe"],["#f093fb","#f5576c"],
      ["#43e97b","#38f9d7"],["#fa709a","#fee140"],["#a18cd1","#fbc2eb"],
    ];
    return g[name ? name.charCodeAt(0) % g.length : 0];
  };

  const formatDate = (d) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  };

  const getJoinedAgo = (d) => {
    if (!d) return "";
    const days = Math.floor((Date.now() - new Date(d)) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    const m = Math.floor(days / 30);
    return m === 1 ? "1 month ago" : `${m} months ago`;
  };

  const colors = getGradient(profile?.name || "U");

  // ─── LOADING ──────────────────
  if (loading) return (
    <>
      <style>{cssStyles}</style>
      <div className="pf-page">
        <div className="pf-bg"></div>
        <div className="pf-loading"><div className="pf-spinner"></div><p>Loading profile...</p></div>
      </div>
    </>
  );

  // ─── ERROR ────────────────────
  if (error) return (
    <>
      <style>{cssStyles}</style>
      <div className="pf-page">
        <div className="pf-bg"></div>
        <div className="pf-error-card">
          <div className="pf-error-emoji">⚠️</div>
          <h3>Something went wrong</h3>
          <p className="pf-error-msg">{error}</p>
          <p className="pf-error-sub">Redirecting to login...</p>
        </div>
      </div>
    </>
  );

  // ─── MAIN ─────────────────────
  return (
    <>
      <style>{cssStyles}</style>
      <div className="pf-page">
        <div className="pf-bg"></div>
        <div className="pf-orb pf-orb1"></div>
        <div className="pf-orb pf-orb2"></div>
        <div className="pf-orb pf-orb3"></div>

        {/* ── Toast Notification ── */}
        {toast.show && (
          <div className={`pf-toast pf-toast-${toast.type}`}>
            <span className="pf-toast-icon">
              {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}
            </span>
            {toast.msg}
          </div>
        )}

        <div className={`pf-card ${mounted ? "pf-card-on" : ""}`}>

          {/* ── BANNER ──────────── */}
          <div className="pf-banner" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
            <svg className="pf-banner-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,64 C360,120 720,0 1080,80 C1260,100 1380,40 1440,56 L1440,120 L0,120 Z" fill="rgba(6,6,14,1)"/>
            </svg>
            <button className="pf-logout" onClick={handleLogout}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>

          {/* ── AVATAR ──────────── */}
          <div className="pf-avatar-area">
            <div className="pf-avatar-ring" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
              <div className="pf-avatar-circle">
                <span className="pf-avatar-text">{getInitials(profile?.name)}</span>
              </div>
            </div>
            <div className="pf-online-dot"></div>
          </div>

          {/* ── IDENTITY ────────── */}
          <div className="pf-identity">
            <h1 className="pf-name">{profile?.name || "User"}</h1>
            <p className="pf-email-line">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {profile?.email}
            </p>
            <div className="pf-tags">
              <span className="pf-tag pf-tag-v">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
              </span>
              <span className="pf-tag pf-tag-a"><span className="pf-blink"></span>Active</span>
            </div>
          </div>

          {/* ── QUICK STATS ─────── */}
          <div className="pf-stats">
            <div className="pf-stat">
              <div className="pf-stat-ic" style={{ background: `${colors[0]}18`, color: colors[0] }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <strong>#{profile?.id}</strong>
              <small>USER ID</small>
            </div>
            <div className="pf-stat-line"></div>
            <div className="pf-stat">
              <div className="pf-stat-ic" style={{ background: "rgba(67,233,123,0.1)", color: "#43e97b" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <strong>{getJoinedAgo(profile?.createdAt)}</strong>
              <small>JOINED</small>
            </div>
            <div className="pf-stat-line"></div>
            <div className="pf-stat">
              <div className="pf-stat-ic" style={{ background: "rgba(250,112,154,0.1)", color: "#fa709a" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <strong style={{ color: "#43e97b" }}>Secure</strong>
              <small>STATUS</small>
            </div>
          </div>

          {/* ── VIEW MODE ──────── */}
          {!editing && (
            <div className="pf-details">
              <div className="pf-details-head">
                <h3>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  Account Details
                </h3>
                <button className="pf-edit-btn" onClick={() => setEditing(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit Profile
                </button>
              </div>

              <div className="pf-info-grid">
                <div className="pf-info-item">
                  <div className="pf-info-ic" style={{ background: `${colors[0]}15` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors[0]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div className="pf-info-text">
                    <span className="pf-info-label">Full Name</span>
                    <span className="pf-info-val">{profile?.name}</span>
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-ic" style={{ background: `${colors[1]}15` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors[1]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div className="pf-info-text">
                    <span className="pf-info-label">Email Address</span>
                    <span className="pf-info-val">{profile?.email}</span>
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-ic" style={{ background: "rgba(67,233,123,0.08)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#43e97b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div className="pf-info-text">
                    <span className="pf-info-label">Member Since</span>
                    <span className="pf-info-val">{formatDate(profile?.createdAt)}</span>
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-ic" style={{ background: "rgba(79,172,254,0.08)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                  </div>
                  <div className="pf-info-text">
                    <span className="pf-info-label">Last Updated</span>
                    <span className="pf-info-val">{formatDate(profile?.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EDIT MODE ──────── */}
          {editing && (
            <form className="pf-edit-section" onSubmit={handleUpdate}>
              <div className="pf-edit-head">
                <h3>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit Profile
                </h3>
              </div>

              <div className="pf-field">
                <label>Full Name</label>
                <div className="pf-input-wrap">
                  <svg className="pf-input-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="pf-field">
                <label>Email Address</label>
                <div className="pf-input-wrap">
                  <svg className="pf-input-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="pf-field">
                <label>New Password <span className="pf-opt">(optional)</span></label>
                <div className="pf-input-wrap">
                  <svg className="pf-input-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editForm.password}
                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    placeholder="Leave blank to keep current"
                  />
                  <button type="button" className="pf-eye" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="pf-edit-actions">
                <button type="button" className="pf-btn-cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="pf-btn-save" disabled={saving}>
                  {saving ? (
                    <><span className="pf-btn-spin"></span> Saving...</>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ── FOOTER ──────────── */}
          <div className="pf-footer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Your data is protected & encrypted
          </div>
        </div>
      </div>
    </>
  );
};

/* ═══════════════════ CSS ═══════════════════ */
const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* ── PAGE ──────────────────── */
.pf-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 16px;
  background: #06060e;
}
.pf-bg {
  position: fixed; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 70% 50% at 50% -10%, rgba(120,90,255,0.14), transparent),
    radial-gradient(ellipse 50% 40% at 90% 100%, rgba(255,80,150,0.07), transparent),
    radial-gradient(ellipse 40% 40% at 5% 80%, rgba(60,120,255,0.07), transparent);
}
.pf-orb {
  position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none;
}
.pf-orb1 { width: 500px; height: 500px; background: rgba(124,92,252,0.09); top: -120px; right: -80px; animation: pfF1 20s ease-in-out infinite; }
.pf-orb2 { width: 380px; height: 380px; background: rgba(200,80,192,0.06); bottom: -100px; left: -80px; animation: pfF2 26s ease-in-out infinite; }
.pf-orb3 { width: 260px; height: 260px; background: rgba(79,172,254,0.06); top: 55%; left: 45%; animation: pfF3 18s ease-in-out infinite; }

@keyframes pfF1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,70px)} }
@keyframes pfF2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,-50px)} }
@keyframes pfF3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-30%,-70%) scale(1.15)} }

/* ── LOADING ───────────────── */
.pf-loading { text-align: center; z-index: 10; }
.pf-loading p { color: rgba(255,255,255,0.4); font-size: 14px; margin: 0; }
.pf-spinner {
  width: 40px; height: 40px;
  border: 3px solid rgba(255,255,255,0.06);
  border-top-color: #7c5cfc;
  border-radius: 50%;
  animation: pfSpin 0.65s linear infinite;
  margin: 0 auto 18px;
}
@keyframes pfSpin { to { transform: rotate(360deg); } }

/* ── ERROR ─────────────────── */
.pf-error-card {
  background: rgba(255,255,255,0.035); backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 22px;
  padding: 44px 36px; text-align: center; z-index: 10; max-width: 360px;
}
.pf-error-emoji { font-size: 40px; margin-bottom: 14px; }
.pf-error-card h3 { color: #fff; font-size: 19px; font-weight: 600; margin: 0 0 8px; }
.pf-error-msg { color: #ff6b6b; font-size: 13px; margin: 0 0 6px; }
.pf-error-sub { color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; }

/* ── TOAST ─────────────────── */
.pf-toast {
  position: fixed; top: 28px; left: 50%; transform: translateX(-50%);
  padding: 12px 24px; border-radius: 14px; font-size: 13px; font-weight: 600;
  display: flex; align-items: center; gap: 10px; z-index: 1000;
  backdrop-filter: blur(16px); animation: pfToastIn 0.4s cubic-bezier(0.16,1,0.3,1);
  font-family: 'Inter', sans-serif; white-space: nowrap;
}
.pf-toast-success { background: rgba(67,233,123,0.12); border: 1px solid rgba(67,233,123,0.25); color: #43e97b; }
.pf-toast-error { background: rgba(255,59,48,0.1); border: 1px solid rgba(255,59,48,0.2); color: #ff6b6b; }
.pf-toast-info { background: rgba(79,172,254,0.1); border: 1px solid rgba(79,172,254,0.2); color: #4facfe; }
.pf-toast-icon {
  width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800;
}
.pf-toast-success .pf-toast-icon { background: rgba(67,233,123,0.2); }
.pf-toast-error .pf-toast-icon { background: rgba(255,59,48,0.2); }
.pf-toast-info .pf-toast-icon { background: rgba(79,172,254,0.2); }
@keyframes pfToastIn { from { opacity: 0; transform: translateX(-50%) translateY(-16px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

/* ── CARD ──────────────────── */
.pf-card {
  width: 100%; max-width: 500px;
  background: rgba(255,255,255,0.025);
  backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.055);
  border-radius: 28px; overflow: hidden;
  position: relative; z-index: 10;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.025) inset,
    0 40px 100px -20px rgba(0,0,0,0.5),
    0 0 100px -30px rgba(124,92,252,0.1);
  opacity: 0; transform: translateY(28px) scale(0.97);
  transition: all 0.7s cubic-bezier(0.16,1,0.3,1);
}
.pf-card-on { opacity: 1; transform: translateY(0) scale(1); }

/* ── BANNER ────────────────── */
.pf-banner {
  height: 140px; position: relative; overflow: hidden;
}
.pf-banner-wave {
  position: absolute; bottom: -1px; left: 0; width: 100%; height: 40px;
}
.pf-logout {
  position: absolute; top: 14px; right: 14px;
  background: rgba(0,0,0,0.22); backdrop-filter: blur(10px);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 7px 15px; border-radius: 10px; cursor: pointer;
  font-weight: 600; font-size: 12px; font-family: inherit;
  display: flex; align-items: center; gap: 6px;
  transition: all 0.25s ease; letter-spacing: 0.3px;
}
.pf-logout:hover { background: rgba(0,0,0,0.4); transform: translateY(-1px); }

/* ── AVATAR ────────────────── */
.pf-avatar-area {
  display: flex; justify-content: center; margin-top: -54px; position: relative; z-index: 5;
}
.pf-avatar-ring {
  width: 108px; height: 108px; border-radius: 50%; padding: 4px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.35);
}
.pf-avatar-circle {
  width: 100%; height: 100%; border-radius: 50%;
  background: #0d0d18; display: flex; align-items: center; justify-content: center;
  border: 3px solid rgba(255,255,255,0.04);
}
.pf-avatar-text {
  font-size: 36px; font-weight: 800; letter-spacing: 3px;
  background: linear-gradient(135deg, #c4b5fd, #f9a8d4);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pf-online-dot {
  position: absolute; bottom: 6px; right: calc(50% - 54px + 10px);
  width: 16px; height: 16px; border-radius: 50%;
  background: #43e97b; border: 3px solid #0d0d18;
  animation: pfPulse 2.5s ease-in-out infinite;
}
@keyframes pfPulse { 0%,100%{box-shadow:0 0 0 0 rgba(67,233,123,0.4)} 50%{box-shadow:0 0 0 8px rgba(67,233,123,0)} }

/* ── IDENTITY ──────────────── */
.pf-identity { text-align: center; padding: 16px 28px 22px; }
.pf-name { margin: 0 0 4px; font-size: 26px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
.pf-email-line {
  margin: 0 0 16px; font-size: 13px; color: rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.pf-tags { display: flex; justify-content: center; gap: 8px; }
.pf-tag {
  display: flex; align-items: center; gap: 5px; padding: 5px 13px; border-radius: 20px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
}
.pf-tag-v { background: rgba(124,92,252,0.08); border: 1px solid rgba(124,92,252,0.18); color: #a78bfa; }
.pf-tag-a { background: rgba(67,233,123,0.06); border: 1px solid rgba(67,233,123,0.18); color: #43e97b; }
.pf-blink {
  width: 6px; height: 6px; border-radius: 50%; background: #43e97b;
  animation: pfBlink 1.4s ease-in-out infinite;
}
@keyframes pfBlink { 0%,100%{opacity:1} 50%{opacity:0.25} }

/* ── STATS ─────────────────── */
.pf-stats {
  display: flex; align-items: center; justify-content: space-around;
  padding: 18px 20px; margin: 0 20px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 16px;
}
.pf-stat { display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 1; }
.pf-stat-ic {
  width: 38px; height: 38px; border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
}
.pf-stat strong { font-size: 13px; color: #fff; letter-spacing: -0.2px; }
.pf-stat small { font-size: 10px; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.pf-stat-line { width: 1px; height: 44px; background: rgba(255,255,255,0.05); }

/* ── DETAILS (VIEW) ────────── */
.pf-details { padding: 24px 20px 4px; }
.pf-details-head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding: 0 4px;
}
.pf-details-head h3 {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.4);
  text-transform: uppercase; letter-spacing: 0.8px; margin: 0;
  display: flex; align-items: center; gap: 8px;
}
.pf-details-head h3 svg { opacity: 0.5; }
.pf-edit-btn {
  display: flex; align-items: center; gap: 6px;
  background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2);
  color: #a78bfa; padding: 7px 16px; border-radius: 10px;
  cursor: pointer; font-weight: 600; font-size: 12px; font-family: inherit;
  transition: all 0.25s ease; letter-spacing: 0.2px;
}
.pf-edit-btn:hover { background: rgba(124,92,252,0.18); transform: translateY(-1px); }

.pf-info-grid { display: flex; flex-direction: column; gap: 6px; }
.pf-info-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px; border-radius: 14px;
  background: rgba(255,255,255,0.018); border: 1px solid rgba(255,255,255,0.03);
  transition: all 0.2s ease;
}
.pf-info-item:hover { background: rgba(255,255,255,0.035); }
.pf-info-ic {
  width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.pf-info-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.pf-info-label { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; }
.pf-info-val {
  font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 600;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* ── EDIT FORM ─────────────── */
.pf-edit-section { padding: 24px 20px 8px; animation: pfSlideIn 0.35s cubic-bezier(0.16,1,0.3,1); }
@keyframes pfSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.pf-edit-head {
  margin-bottom: 20px; padding: 0 4px;
}
.pf-edit-head h3 {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.4);
  text-transform: uppercase; letter-spacing: 0.8px; margin: 0;
  display: flex; align-items: center; gap: 8px;
}
.pf-edit-head h3 svg { opacity: 0.5; }

.pf-field { margin-bottom: 18px; }
.pf-field label {
  display: block; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
}
.pf-opt { text-transform: none; color: rgba(255,255,255,0.25); font-weight: 400; letter-spacing: 0; }
.pf-input-wrap {
  position: relative; display: flex; align-items: center;
}
.pf-input-ic {
  position: absolute; left: 14px; color: rgba(255,255,255,0.2);
  pointer-events: none; transition: color 0.3s;
}
.pf-input-wrap input {
  width: 100%; padding: 13px 16px 13px 44px;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 13px; color: #fff; font-size: 14px; font-family: inherit;
  outline: none; transition: all 0.3s ease;
}
.pf-input-wrap input::placeholder { color: rgba(255,255,255,0.18); }
.pf-input-wrap input:focus {
  border-color: rgba(124,92,252,0.45);
  background: rgba(255,255,255,0.05);
  box-shadow: 0 0 0 4px rgba(124,92,252,0.08);
}
.pf-input-wrap:focus-within .pf-input-ic { color: #7c5cfc; }
.pf-eye {
  position: absolute; right: 14px; background: none; border: none;
  color: rgba(255,255,255,0.2); cursor: pointer; padding: 4px;
  display: flex; transition: color 0.2s;
}
.pf-eye:hover { color: rgba(255,255,255,0.5); }

.pf-edit-actions { display: flex; gap: 10px; margin-top: 6px; }
.pf-btn-cancel {
  flex: 1; padding: 13px; border-radius: 13px; cursor: pointer;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 600; font-family: inherit;
  transition: all 0.25s ease;
}
.pf-btn-cancel:hover { background: rgba(255,255,255,0.07); color: #fff; }
.pf-btn-save {
  flex: 1.4; padding: 13px; border-radius: 13px; cursor: pointer;
  background: linear-gradient(135deg, #7c5cfc, #c850c0); border: none;
  color: #fff; font-size: 14px; font-weight: 600; font-family: inherit;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden;
}
.pf-btn-save::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.pf-btn-save:hover:not(:disabled)::before { opacity: 1; }
.pf-btn-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px -8px rgba(124,92,252,0.4); }
.pf-btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
.pf-btn-spin {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%; animation: pfSpin 0.6s linear infinite;
  display: inline-block;
}

/* ── FOOTER ────────────────── */
.pf-footer {
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 18px 20px; margin-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.18); font-size: 11px; font-weight: 500; letter-spacing: 0.3px;
}

/* ── RESPONSIVE ────────────── */
@media (max-width: 480px) {
  .pf-card { border-radius: 22px; }
  .pf-name { font-size: 22px; }
  .pf-stats { margin: 0 12px; padding: 14px 10px; }
  .pf-details, .pf-edit-section { padding: 20px 14px 4px; }
  .pf-info-item { padding: 12px 14px; }
  .pf-edit-actions { flex-direction: column; }
}
`;

export default Profile;
