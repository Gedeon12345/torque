import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, clearToken, getToken, setToken } from "@/utils/apiClient";

const AuthContext = createContext(null);

/**
 * Compte connecté (ou non). Au chargement, si un jeton est déjà stocké, on vérifie
 * qu'il est encore valable en rechargeant le profil (GET /auth/me).
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authenticated | guest

  useEffect(() => {
    if (!getToken()) {
      setStatus("guest");
      return;
    }
    api
      .get("/auth/me")
      .then(({ user: me }) => {
        setUser(me);
        setStatus("authenticated");
      })
      .catch(() => {
        clearToken();
        setStatus("guest");
      });
  }, []);

  const applySession = useCallback(({ user: nextUser, token }) => {
    setToken(token);
    setUser(nextUser);
    setStatus("authenticated");
  }, []);

  const register = useCallback((payload) => api.post("/auth/register", payload).then(applySession), [applySession]);
  const login = useCallback((payload) => api.post("/auth/login", payload).then(applySession), [applySession]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus("guest");
  }, []);

  const updateProfile = useCallback(
    (payload) => api.patch("/auth/me", payload).then(({ user: next }) => setUser(next)),
    [],
  );
  const changePassword = useCallback((payload) => api.patch("/auth/password", payload).then(applySession), [applySession]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      isAdmin: user?.role === "admin",
      register,
      login,
      logout,
      updateProfile,
      changePassword,
    }),
    [user, status, register, login, logout, updateProfile, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans <AuthProvider>.");
  return context;
}
