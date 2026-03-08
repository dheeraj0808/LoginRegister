import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [animateIn, setAnimateIn] = useState(false);
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
        // Trigger entrance animation after data loads
        setTimeout(() => setAnimateIn(true), 100);
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

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get a color based on user name
  const getAvatarGradient = (name) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    ];
    const index = name ? name.charCodeAt(0) % gradients.length : 0;
    return gradients[index];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeSinceJoined = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const joined = new Date(dateString);
    const diffMs = now - joined;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    const months = Math.floor(diffDays / 30);
    if (months === 1) return "1 month ago";
    return `${months} months ago`;
  };

  // ─── LOADING STATE ─────────────────────────────
  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <style>{keyframes}</style>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // ─── ERROR STATE ───────────────────────────────
  if (error) {
    return (
      <div style={styles.pageContainer}>
        <style>{keyframes}</style>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Oops!</h3>
          <p style={styles.errorText}>{error}</p>
          <p style={styles.errorSubtext}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // ─── PROFILE VIEW ─────────────────────────────
  return (
    <div style={styles.pageContainer}>
      <style>{keyframes}</style>

      {/* Floating Orbs Background */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      <div
        style={{
          ...styles.mainCard,
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Header Section */}
        <div style={styles.cardHeader}>
          <div style={styles.headerPattern}></div>
          <button
            onClick={handleLogout}
            style={styles.logoutBtn}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.3)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.15)";
              e.target.style.transform = "scale(1)";
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Avatar Section */}
        <div style={styles.avatarSection}>
          <div style={styles.avatarRing}>
            <div
              style={{
                ...styles.avatar,
                background: getAvatarGradient(profile?.name),
              }}
            >
              <span style={styles.avatarText}>
                {getInitials(profile?.name)}
              </span>
            </div>
            <div style={styles.statusDot}></div>
          </div>

          <h1 style={styles.userName}>{profile?.name || "User"}</h1>
          <p style={styles.userEmail}>{profile?.email || "No email"}</p>

          <div style={styles.badgeRow}>
            <span style={styles.verifiedBadge}>✅ Verified</span>
            <span style={styles.activeBadge}>🟢 Active</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(102,126,234,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={styles.statIcon}>🆔</span>
            <span style={styles.statValue}>#{profile?.id || "—"}</span>
            <span style={styles.statLabel}>User ID</span>
          </div>
          <div
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(118,75,162,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={styles.statIcon}>📅</span>
            <span style={styles.statValue}>
              {getTimeSinceJoined(profile?.createdAt)}
            </span>
            <span style={styles.statLabel}>Joined</span>
          </div>
          <div
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(67,233,123,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={styles.statIcon}>🔗</span>
            <span style={styles.statValue}>Active</span>
            <span style={styles.statLabel}>Status</span>
          </div>
        </div>

        {/* Profile Details Section */}
        <div style={styles.detailsSection}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>👤</span>
            Profile Details
          </h3>

          <div style={styles.detailRow}>
            <div style={styles.detailLeft}>
              <span style={styles.detailIcon}>📛</span>
              <span style={styles.detailLabel}>Full Name</span>
            </div>
            <span style={styles.detailValue}>{profile?.name || "—"}</span>
          </div>

          <div style={styles.detailRow}>
            <div style={styles.detailLeft}>
              <span style={styles.detailIcon}>📧</span>
              <span style={styles.detailLabel}>Email Address</span>
            </div>
            <span style={styles.detailValue}>{profile?.email || "—"}</span>
          </div>

          <div style={styles.detailRow}>
            <div style={styles.detailLeft}>
              <span style={styles.detailIcon}>🗓️</span>
              <span style={styles.detailLabel}>Member Since</span>
            </div>
            <span style={styles.detailValue}>
              {formatDate(profile?.createdAt)}
            </span>
          </div>

          <div style={{ ...styles.detailRow, border: "none" }}>
            <div style={styles.detailLeft}>
              <span style={styles.detailIcon}>🔄</span>
              <span style={styles.detailLabel}>Last Updated</span>
            </div>
            <span style={styles.detailValue}>
              {formatDate(profile?.updatedAt)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            🔒 Your data is safe and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── KEYFRAMES ─────────────────────────────────
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(80px, -60px) scale(1.1); }
    66% { transform: translate(-40px, 40px) scale(0.95); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-60px, 80px) scale(1.15); }
    66% { transform: translate(50px, -30px) scale(0.9); }
  }
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, 60px) scale(1.05); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(67, 233, 123, 0.5); }
    50% { box-shadow: 0 0 0 6px rgba(67, 233, 123, 0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

// ─── STYLES ────────────────────────────────────
const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },

  // Floating Orbs
  orb1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(102,126,234,0.25) 0%, transparent 70%)",
    top: "-100px",
    left: "-100px",
    animation: "float1 15s infinite ease-in-out",
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(118,75,162,0.25) 0%, transparent 70%)",
    bottom: "-80px",
    right: "-80px",
    animation: "float2 18s infinite ease-in-out",
    pointerEvents: "none",
  },
  orb3: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(240,147,251,0.15) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    animation: "float3 12s infinite ease-in-out",
    pointerEvents: "none",
  },

  // Loading
  loadingContainer: {
    textAlign: "center",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255,255,255,0.1)",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  loadingText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "16px",
    letterSpacing: "0.5px",
  },

  // Error
  errorCard: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "48px",
    textAlign: "center",
    maxWidth: "380px",
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  errorTitle: {
    color: "#fff",
    fontSize: "22px",
    marginBottom: "8px",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "8px",
  },
  errorSubtext: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "13px",
  },

  // Main Card
  mainCard: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 32px 100px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    zIndex: 1,
  },

  // Header
  cardHeader: {
    height: "120px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    position: "relative",
    overflow: "hidden",
  },
  headerPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)",
    backgroundSize: "60px 60px, 80px 80px",
  },
  logoutBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "8px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    letterSpacing: "0.3px",
  },

  // Avatar Section
  avatarSection: {
    textAlign: "center",
    marginTop: "-50px",
    padding: "0 32px 24px",
  },
  avatarRing: {
    position: "relative",
    display: "inline-block",
    marginBottom: "16px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid rgba(15,12,41,0.8)",
    boxShadow: "0 8px 32px rgba(102,126,234,0.4)",
  },
  avatarText: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#fff",
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
    letterSpacing: "2px",
  },
  statusDot: {
    position: "absolute",
    bottom: "6px",
    right: "6px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#43e97b",
    border: "3px solid rgba(15,12,41,0.8)",
    animation: "pulse 2s infinite",
  },
  userName: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  userEmail: {
    margin: "6px 0 16px",
    color: "rgba(255,255,255,0.5)",
    fontSize: "14px",
    letterSpacing: "0.2px",
  },
  badgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  verifiedBadge: {
    background: "rgba(102,126,234,0.15)",
    border: "1px solid rgba(102,126,234,0.3)",
    color: "#a3b3ff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  activeBadge: {
    background: "rgba(67,233,123,0.1)",
    border: "1px solid rgba(67,233,123,0.3)",
    color: "#43e97b",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    padding: "0 24px 24px",
  },
  statCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "16px 8px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
  },
  statIcon: {
    fontSize: "20px",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "-0.3px",
  },
  statLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "500",
  },

  // Details Section
  detailsSection: {
    padding: "0 24px 24px",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    letterSpacing: "0.2px",
  },
  sectionIcon: {
    fontSize: "18px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    marginBottom: "8px",
    transition: "background 0.2s ease",
  },
  detailLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  detailIcon: {
    fontSize: "16px",
  },
  detailLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "13px",
    color: "#fff",
    fontWeight: "600",
    textAlign: "right",
    maxWidth: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  // Footer
  footer: {
    padding: "16px 24px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
  },
  footerText: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.3px",
  },
};

export default Profile;
