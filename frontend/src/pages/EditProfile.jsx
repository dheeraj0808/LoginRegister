import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EditProfile() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/profile");
                const u = data.user || data;
                setForm({ name: u.name, email: u.email, password: "" });
            } catch {
                navigate("/login");
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            // Only send password if user typed a new one
            const payload = { name: form.name, email: form.email };
            if (form.password) payload.password = form.password;

            await api.patch("/profile", payload);
            setSuccess("Profile updated successfully!");
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Profile</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="New Password (leave blank to keep)"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
            <p>
                <button className="btn-link" onClick={() => navigate("/dashboard")}>
                    ← Back to Dashboard
                </button>
            </p>
        </div>
    );
}

export default EditProfile;
