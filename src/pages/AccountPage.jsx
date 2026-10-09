import { useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import Container from "@/components/common/Container";
import PageHeading from "@/components/common/PageHeading";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useAuth } from "@/store/AuthProvider";
import { ApiRequestError } from "@/utils/apiClient";

function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? "" });
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);
    try {
      await updateProfile(form);
      setFeedback({ type: "success", text: "Profil mis à jour." });
    } catch (err) {
      setFeedback({ type: "error", text: err instanceof ApiRequestError ? err.message : "Échec de la mise à jour." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-5 sm:p-7">
      <h2 className="font-display text-2xl font-bold">Mes informations</h2>
      <TextField id="profile-email" label="E-mail" value={user.email} disabled className="opacity-70" />
      <div className="grid grid-cols-2 gap-3">
        <TextField id="profile-firstname" label="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <TextField id="profile-lastname" label="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      </div>
      <TextField id="profile-phone" label="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      {feedback && <p role="status" className={`rounded-[10px] px-3.5 py-3 text-sm ${feedback.type === "error" ? "bg-accent-soft text-danger" : "bg-accent-soft text-ink"}`}>{feedback.text}</p>}
      <Button type="submit" disabled={isSubmitting} className="self-start">{isSubmitting ? "Enregistrement…" : "Enregistrer"}</Button>
    </form>
  );
}

function PasswordForm() {
  const { changePassword } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);
    try {
      await changePassword(form);
      setForm({ currentPassword: "", newPassword: "" });
      setFeedback({ type: "success", text: "Mot de passe modifié." });
    } catch (err) {
      setFeedback({ type: "error", text: err instanceof ApiRequestError ? err.message : "Échec du changement." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-5 sm:p-7">
      <h2 className="font-display text-2xl font-bold">Mot de passe</h2>
      <TextField id="password-current" label="Mot de passe actuel" type="password" autoComplete="current-password" required value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
      <TextField id="password-new" label="Nouveau mot de passe" type="password" autoComplete="new-password" minLength={8} required value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
      {feedback && <p role="status" className={`rounded-[10px] px-3.5 py-3 text-sm ${feedback.type === "error" ? "bg-accent-soft text-danger" : "bg-accent-soft text-ink"}`}>{feedback.text}</p>}
      <Button type="submit" disabled={isSubmitting} className="self-start">{isSubmitting ? "Modification…" : "Changer le mot de passe"}</Button>
    </form>
  );
}

export default function AccountPage() {
  useDocumentTitle("Mon compte");
  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Mon compte" />
      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileForm />
        <div className="flex flex-col gap-6">
          <PasswordForm />
          <Link to="/orders" className="flex items-center justify-between rounded-[20px] border border-line bg-surface p-5 transition-colors hover:border-ink sm:p-7">
            <span className="flex items-center gap-3 font-semibold"><Package size={20} aria-hidden="true" />Mes commandes</span>
            <span className="text-ink-2">→</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
