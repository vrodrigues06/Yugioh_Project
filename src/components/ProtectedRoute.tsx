import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const { status, loading } = useAuth();

  if (loading) {
    // Pode exibir um spinner, um loading simples ou tela branca
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
