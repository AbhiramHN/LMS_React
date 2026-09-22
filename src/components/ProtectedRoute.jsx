import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentEmployee } from "../services/authService";

function ProtectedRoute({ children }) {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        getCurrentEmployee()
            .then(() => setAuthenticated(true))
            .catch(() => setAuthenticated(false));
    }, []);

    if (authenticated === null) {
        return null;
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;