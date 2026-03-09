import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ children }) {
    const { token, loading } = useAuth();

    if (loading) return <div className="form-container"><p>Loading...</p></div>;

    return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
