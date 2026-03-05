import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => {
        localStorage.clear();
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={{ color: "#fff", fontSize: "20px" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
        <img src={profile.avatar} alt="avatar" style={styles.avatar} />
        <h1 style={styles.name}>{profile.name}</h1>
        <p style={styles.email}>{profile.email}</p>
        <p style={styles.bio}>"{profile.bio}"</p>

        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statNum}>12</span>
            <span style={styles.statLabel}>Posts</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNum}>340</span>
            <span style={styles.statLabel}>Followers</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNum}>180</span>
            <span style={styles.statLabel}>Following</span>
          </div>
        </div>

        <div style={styles.infoSection}>
          <h3 style={styles.sectionTitle}>📋 Profile Info</h3>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>📧 Email</span>
            <span style={styles.infoValue}>{profile.email}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>📅 Joined</span>
            <span style={styles.infoValue}>
              {new Date(profile.joinedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>🟢 Status</span>
            <span style={{ ...styles.infoValue, color: "#27ae60", fontWeight: "bold" }}>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px 36px",
    width: "420px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
    textAlign: "center",
    position: "relative",
  },
  logoutBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid #764ba2",
    marginBottom: "12px",
  },
  name: { margin: "0", fontSize: "26px", color: "#222" },
  email: { margin: "4px 0 8px", color: "#888", fontSize: "14px" },
  bio: { color: "#555", fontStyle: "italic", fontSize: "14px", marginBottom: "20px" },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "14px",
    padding: "16px 0",
    marginBottom: "24px",
  },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center" },
  statNum: { fontSize: "22px", fontWeight: "bold", color: "#fff" },
  statLabel: { fontSize: "12px", color: "rgba(255,255,255,0.8)" },
  infoSection: { textAlign: "left" },
  sectionTitle: { fontSize: "16px", color: "#333", marginBottom: "12px" },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  infoLabel: { color: "#666", fontSize: "14px" },
  infoValue: { color: "#333", fontSize: "14px", fontWeight: "500" },
};

export default Dashboard;
