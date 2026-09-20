import Container from "@/components/common/Container";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Page provisoire pour une route pas encore construite. */
export default function PlaceholderPage({ title }) {
  useDocumentTitle(title);

  return (
    <Container className="min-h-[60vh] pt-28">
      <h1 className="font-display text-5xl font-bold leading-none">{title}</h1>
      <p className="mt-4 text-ink-2">Cette page sera construite dans une prochaine phase.</p>
    </Container>
  );
}
