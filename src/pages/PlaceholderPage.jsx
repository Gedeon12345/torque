import Container from "@/components/common/Container";

/** Page provisoire pour les routes qui seront construites en phase 5. */
export default function PlaceholderPage({ title }) {
  return (
    <Container className="min-h-[60vh] pt-28">
      <h1 className="font-display text-5xl font-bold leading-none">{title}</h1>
      <p className="mt-4 text-ink-2">Cette page sera construite dans une prochaine phase.</p>
    </Container>
  );
}
