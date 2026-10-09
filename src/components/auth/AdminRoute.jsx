import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/store/AuthProvider";

/** Comme ProtectedRoute, mais exige en plus le rôle admin (sinon renvoie à l'accueil). */
export default function AdminRoute() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <Spinner />
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
