import { Link } from "react-router-dom";
import Section from "@/components/common/Section";
import CtaDisc from "@/components/home/CtaDisc";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <Section aria-labelledby="cta-title">
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-graphite px-6 py-14 text-white md:rounded-[28px] md:px-16 md:py-24">
        <h2
          id="cta-title"
          className="max-w-[12ch] font-display text-[length:clamp(38px,9.5vw,76px)] font-extrabold uppercase leading-[0.96] text-balance"
        >
          Besoin d'une pièce pour votre véhicule ?
        </h2>
        <p className="mt-4 max-w-[40ch] text-lg text-[#b9bfc9]">Trouvez rapidement ce qu'il vous faut.</p>
        <Button as={Link} to="/products" size="lg" className="mt-7 w-full md:w-auto">
          Explorer les pièces
        </Button>

        <CtaDisc className="absolute -bottom-[170px] -right-40 -z-10 size-[440px] text-white/[0.14] md:-bottom-[140px] md:-right-[120px] md:size-[640px]" />
      </div>
    </Section>
  );
}
