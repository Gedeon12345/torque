import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/AuthProvider";

/**
 * Protège une action qui exige un compte : favoris, panier, commande.
 * Si l'utilisateur n'est pas connecté, on l'envoie se connecter et on revient sur la page
 * actuelle ensuite (state.from), au lieu d'effectuer l'action en silence.
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return useCallback(
    (action) => {
      if (!isAuthenticated) {
        navigate("/login", { state: { from: window.location.pathname + window.location.search } });
        return false;
      }
      action();
      return true;
    },
    [isAuthenticated, navigate],
  );
}
