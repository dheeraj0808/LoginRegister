import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Dashboard</h2>
      {user && (
        <div className="profile-card">
          <p>
            <strong>Welcome, {user.name}!</strong>
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
      <div className="btn-group">
        <Link to="/profile">
          <button className="btn-primary">Edit Profile</button>
        </Link>
        <Link to="/change-password">
          <button className="btn-primary">Change Password</button>
        </Link>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
