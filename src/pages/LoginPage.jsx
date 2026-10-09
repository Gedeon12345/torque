import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useAuth } from "@/store/AuthProvider";
import { ApiRequestError } from "@/utils/apiClient";

export default function LoginPage() {
  useDocumentTitle("Connexion");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from ?? "/account", { replace: true });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Connexion impossible pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Connexion" description="Connectez-vous pour commander, gérer vos favoris et suivre vos commandes.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <TextField id="login-email" label="E-mail" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField id="login-password" label="Mot de passe" type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p role="alert" className="rounded-[10px] bg-accent-soft px-3.5 py-3 text-sm text-danger">{error}</p>}
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">{isSubmitting ? "Connexion…" : "Se connecter"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-2">
        Pas encore de compte ? <Link to="/register" state={location.state} className="font-semibold text-ink hover:text-accent">Créer un compte</Link>
      </p>
    </AuthLayout>
  );
}
