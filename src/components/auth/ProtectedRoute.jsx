import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/store/AuthProvider";

/** Bloque l'accès à une page tant qu'il n'y a pas de compte connecté (panier, favoris, commandes, compte). */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <Outlet />;
}
