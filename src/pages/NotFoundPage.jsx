import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("Page introuvable");

  return (
    <Container className="min-h-[60vh] pt-28">
      <p className="font-display text-xl font-bold text-accent">Erreur 404</p>
      <h1 className="mt-1 font-display text-5xl font-bold leading-none">Page introuvable</h1>
      <p className="mt-4 max-w-[46ch] text-ink-2">Cette adresse n'existe pas ou a été déplacée.</p>
      <Button as={Link} to="/" className="mt-7">
        Retour à l'accueil
      </Button>
    </Container>
  );
}
