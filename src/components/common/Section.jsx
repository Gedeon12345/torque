import Container from "@/components/common/Container";

/** Section de page : conteneur centré avec l'espacement vertical standard. */
export default function Section({ className = "", ...props }) {
  return <Container as="section" className={`pt-[72px] lg:pt-28 ${className}`} {...props} />;
}
