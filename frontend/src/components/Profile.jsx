import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data.user);
        setTimeout(() => setMounted(true), 100);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
        localStorage.clear();
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGradient = (name) => {
    const gradients = [
      ["#7c5cfc", "#c850c0"],
      ["#4facfe", "#00f2fe"],
      ["#f093fb", "#f5576c"],
      ["#43e97b", "#38f9d7"],
      ["#fa709a", "#fee140"],
      ["#a18cd1", "#fbc2eb"],
      ["#ffecd2", "#fcb69f"],
      ["#89f7fe", "#66a6ff"],
    ];
    const i = name ? name.charCodeAt(0) % gradients.length : 0;
    return gradients[i];
  };

  const formatDate = (d) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  const colors = getGradient(profile?.name || "User");

  // ─── LOADING ─────────────────────
  if (loading) {
    return (
      <>
        <style>{cssStyles}</style>
        <div className="profile-page">
          <div className="bg-gradient"></div>
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching your profile...</p>
          </div>
        </div>
      </>
    );
  }

  // ─── ERROR ───────────────────────
  if (error) {
    return (
      <>
        <style>{cssStyles}</style>
        <div className="profile-page">
          <div className="bg-gradient"></div>
          <div className="error-box">
            <div className="error-icon-big">⚠️</div>
            <h3 className="error-title">Something went wrong</h3>
            <p className="error-msg">{error}</p>
            <p className="error-redirect">Redirecting to login...</p>
          </div>
        </div>
      </>
    );
  }

  // ─── PROFILE ─────────────────────
  return (
    <>
      <style>{cssStyles}</style>
      <div className="profile-page">
        <div className="bg-gradient"></div>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-grid"></div>

        <div className={`profile-card ${mounted ? "profile-card-visible" : ""}`}>

          {/* ── HEADER BANNER ──────────── */}
          <div className="profile-banner" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
            <div className="banner-pattern"></div>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>

          {/* ── AVATAR ─────────────────── */}
          <div className="avatar-wrapper">
            <div className="avatar-ring" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
              <div className="avatar-inner">
                <span className="avatar-initials">{getInitials(profile?.name)}</span>
              </div>
            </div>
            <div className="status-indicator"></div>
          </div>

          {/* ── USER INFO ──────────────── */}
          <div className="user-info">
            <h1 className="user-name">{profile?.name || "User"}</h1>
            <p className="user-email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {profile?.email || "No email"}
            </p>
            <div className="user-badges">
              <span className="badge badge-verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified
              </span>
              <span className="badge badge-active">
                <span className="active-dot"></span>
                Active
              </span>
            </div>
          </div>

          {/* ── STATS ──────────────────── */}
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-icon-wrapper" style={{ background: `rgba(${colors[0] === '#7c5cfc' ? '124,92,252' : '79,172,254'},0.1)` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors[0]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span className="stat-number">#{profile?.id || "—"}</span>
              <span className="stat-text">User ID</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon-wrapper" style={{ background: "rgba(67,233,123,0.1)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43e97b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <span className="stat-number">{getJoinedAgo(profile?.createdAt)}</span>
              <span className="stat-text">Joined</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon-wrapper" style={{ background: "rgba(250,112,154,0.1)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fa709a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="stat-number" style={{ color: "#43e97b" }}>Secure</span>
              <span className="stat-text">Account</span>
            </div>
          </div>

          {/* ── DETAILS ────────────────── */}
          <div className="details-section">
            <h3 className="section-heading">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Account Information
            </h3>

            <div className="detail-card">
              <div className="detail-row">
                <div className="detail-label-group">
                  <div className="detail-dot" style={{ background: colors[0] }}></div>
                  <span className="detail-label">Full Name</span>
                </div>
                <span className="detail-value">{profile?.name || "—"}</span>
              </div>

              <div className="detail-row">
                <div className="detail-label-group">
                  <div className="detail-dot" style={{ background: colors[1] }}></div>
                  <span className="detail-label">Email Address</span>
                </div>
                <span className="detail-value">{profile?.email || "—"}</span>
              </div>

              <div className="detail-row">
                <div className="detail-label-group">
                  <div className="detail-dot" style={{ background: "#43e97b" }}></div>
                  <span className="detail-label">Member Since</span>
                </div>
                <span className="detail-value">{formatDate(profile?.createdAt)}</span>
              </div>

              <div className="detail-row" style={{ borderBottom: "none", paddingBottom: 0 }}>
                <div className="detail-label-group">
                  <div className="detail-dot" style={{ background: "#4facfe" }}></div>
                  <span className="detail-label">Last Updated</span>
                </div>
                <span className="detail-value">{formatDate(profile?.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* ── SECURE FOOTER ──────────── */}
          <div className="profile-footer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Your data is protected and encrypted</span>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── CSS ─────────────────────────────────────────
const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.profile-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 20px;
  background: #06060e;
}

/* ─── BACKGROUND ─────────────────────── */
.profile-page .bg-gradient {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(120,90,255,0.15), transparent),
    radial-gradient(ellipse 50% 40% at 90% 100%, rgba(255,80,150,0.08), transparent),
    radial-gradient(ellipse 40% 40% at 5% 70%, rgba(60,120,255,0.08), transparent);
  pointer-events: none;
}
.profile-page .bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.profile-page .bg-orb-1 {
  width: 500px; height: 500px;
  background: rgba(124,92,252,0.1);
  top: -150px; right: -100px;
  animation: pOrbFloat1 22s ease-in-out infinite;
}
.profile-page .bg-orb-2 {
  width: 400px; height: 400px;
  background: rgba(200,80,192,0.07);
  bottom: -120px; left: -80px;
  animation: pOrbFloat2 28s ease-in-out infinite;
}
.profile-page .bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%);
  pointer-events: none;
}

@keyframes pOrbFloat1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-60px, 80px); }
}
@keyframes pOrbFloat2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(70px, -60px); }
}

/* ─── LOADING ─────────────────────────── */
.loading-box {
  text-align: center;
  z-index: 10;
}
.loading-spinner {
  width: 44px; height: 44px;
  border: 3px solid rgba(255,255,255,0.08);
  border-top-color: #7c5cfc;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 20px;
}
.loading-text {
  color: rgba(255,255,255,0.4);
  font-size: 15px;
  letter-spacing: 0.3px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── ERROR ───────────────────────────── */
.error-box {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 48px 40px;
  text-align: center;
  z-index: 10;
  max-width: 380px;
}
.error-icon-big { font-size: 44px; margin-bottom: 16px; }
.error-title { color: #fff; font-size: 20px; margin: 0 0 8px; font-weight: 600; }
.error-msg { color: #ff6b6b; font-size: 14px; margin: 0 0 8px; }
.error-redirect { color: rgba(255,255,255,0.3); font-size: 13px; margin: 0; }

/* ─── CARD ────────────────────────────── */
.profile-card {
  width: 100%;
  max-width: 460px;
  background: rgba(255,255,255,0.025);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  z-index: 10;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03) inset,
    0 40px 100px -20px rgba(0,0,0,0.5),
    0 0 120px -40px rgba(124,92,252,0.12);
  opacity: 0;
  transform: translateY(30px) scale(0.97);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.profile-card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ─── BANNER ──────────────────────────── */
.profile-banner {
  height: 130px;
  position: relative;
  overflow: hidden;
}
.banner-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 15% 85%, rgba(255,255,255,0.12) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(255,255,255,0.08) 0%, transparent 40%);
}
.logout-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(12px);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease;
}
.logout-btn:hover {
  background: rgba(0,0,0,0.35);
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-1px);
}

/* ─── AVATAR ──────────────────────────── */
.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -52px;
  position: relative;
  z-index: 2;
}
.avatar-ring {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #12121e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255,255,255,0.05);
}
.avatar-initials {
  font-size: 34px;
  font-weight: 800;
  background: linear-gradient(135deg, #c4b5fd, #f9a8d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3px;
}
.status-indicator {
  position: absolute;
  bottom: 4px;
  right: calc(50% - 52px + 8px);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #43e97b;
  border: 3px solid #12121e;
  animation: statusPulse 2.5s ease-in-out infinite;
}
@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(67,233,123,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(67,233,123,0); }
}

/* ─── USER INFO ───────────────────────── */
.user-info {
  text-align: center;
  padding: 18px 32px 24px;
}
.user-name {
  margin: 0 0 4px;
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
}
.user-email {
  margin: 0 0 18px;
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.user-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
}
.badge-verified {
  background: rgba(124,92,252,0.1);
  border: 1px solid rgba(124,92,252,0.2);
  color: #a78bfa;
}
.badge-active {
  background: rgba(67,233,123,0.08);
  border: 1px solid rgba(67,233,123,0.2);
  color: #43e97b;
}
.active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #43e97b;
  animation: activeBlink 1.5s ease-in-out infinite;
}
@keyframes activeBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ─── STATS ───────────────────────────── */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 24px;
  margin: 0 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 18px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}
.stat-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-number {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
}
.stat-text {
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}
.stat-divider {
  width: 1px;
  height: 48px;
  background: rgba(255,255,255,0.06);
}

/* ─── DETAILS ─────────────────────────── */
.details-section {
  padding: 28px 24px 4px;
}
.section-heading {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-heading svg {
  opacity: 0.5;
}
.detail-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 16px;
  overflow: hidden;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  transition: background 0.2s ease;
}
.detail-row:hover {
  background: rgba(255,255,255,0.02);
}
.detail-label-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.detail-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.detail-label {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}
.detail-value {
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  font-weight: 600;
  text-align: right;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── FOOTER ──────────────────────────── */
.profile-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 24px;
  margin-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.2);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* ─── RESPONSIVE ──────────────────────── */
@media (max-width: 480px) {
  .profile-card {
    border-radius: 22px;
  }
  .user-name {
    font-size: 22px;
  }
  .stats-row {
    margin: 0 12px;
    padding: 16px 12px;
  }
  .detail-row {
    padding: 14px 16px;
    flex-wrap: wrap;
    gap: 4px;
  }
  .detail-value {
    max-width: 100%;
  }
}
`;

export default Profile;
