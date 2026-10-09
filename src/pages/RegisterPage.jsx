import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useAuth } from "@/store/AuthProvider";
import { ApiRequestError } from "@/utils/apiClient";

const EMPTY_FORM = { firstName: "", lastName: "", email: "", phone: "", password: "" };

export default function RegisterPage() {
  useDocumentTitle("Créer un compte");
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { phone, ...rest } = form;
      await register({ ...rest, ...(phone && { phone }) });
      navigate(location.state?.from ?? "/account", { replace: true });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Inscription impossible pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Créer un compte" description="Un compte est nécessaire pour ajouter des favoris, un panier et passer commande.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <TextField id="register-firstname" label="Prénom" autoComplete="given-name" required value={form.firstName} onChange={set("firstName")} />
          <TextField id="register-lastname" label="Nom" autoComplete="family-name" required value={form.lastName} onChange={set("lastName")} />
        </div>
        <TextField id="register-email" label="E-mail" type="email" autoComplete="email" required value={form.email} onChange={set("email")} />
        <TextField id="register-phone" label="Téléphone (facultatif)" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
        <TextField id="register-password" label="Mot de passe" type="password" autoComplete="new-password" minLength={8} required value={form.password} onChange={set("password")} />
        {error && <p role="alert" className="rounded-[10px] bg-accent-soft px-3.5 py-3 text-sm text-danger">{error}</p>}
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">{isSubmitting ? "Création…" : "Créer mon compte"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-2">
        Déjà un compte ? <Link to="/login" state={location.state} className="font-semibold text-ink hover:text-accent">Se connecter</Link>
      </p>
    </AuthLayout>
  );
}
