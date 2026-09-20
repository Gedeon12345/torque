import Container from "@/components/common/Container";
import PageHeading from "@/components/common/PageHeading";
import CtaSection from "@/components/home/CtaSection";
import WhySection from "@/components/home/WhySection";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// Texte provisoire : à remplacer par la vraie présentation de la boutique.
export default function AboutPage() {
  useDocumentTitle("À propos");

  return (
    <>
      <Container className="pt-24 lg:pt-32">
        <PageHeading
          title="À propos"
          description="Torque aide les automobilistes de Douala à trouver la bonne pièce, simplement et sans perdre de temps."
        />
        <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink-2">
          <p>
            Choisir une pièce automobile ne devrait pas être un pari. Chaque fiche indique la compatibilité, le prix en FCFA
            et la disponibilité, pour que vous puissiez commander en confiance.
          </p>
          <p>
            Notre catalogue couvre l'entretien courant comme les réparations : freinage, moteur, suspension, électricité,
            éclairage, climatisation, filtration et pneumatiques.
          </p>
        </div>
      </Container>
      <WhySection />
      <CtaSection />
    </>
  );
}
