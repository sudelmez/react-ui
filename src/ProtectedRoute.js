import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/auth-provider";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/auth" />;
    }
    return children;
};