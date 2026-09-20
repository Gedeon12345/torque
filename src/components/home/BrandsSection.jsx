import { createSearchParams, Link } from "react-router-dom";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";

export default function BrandsSection() {
  return (
    <Section id="marques" aria-labelledby="brands-title">
      <SectionHeading id="brands-title" title="Les marques que nous proposons" />

      <ul className="flex flex-wrap justify-center gap-2.5 md:gap-3.5">
        {brands.map((brand) => (
          <li key={brand} className="basis-[calc(33.333%-7px)] md:basis-[calc(20%-12px)]">
            <Link
              to={{ pathname: "/search", search: `?${createSearchParams({ brand })}` }}
              className="grid min-h-[74px] place-items-center rounded-[14px] border border-line bg-surface px-1.5 text-center font-display text-[length:clamp(14px,3.8vw,22px)] font-bold uppercase leading-[1.1] tracking-[0.05em] text-ink-2 transition-colors hover:border-ink hover:text-ink md:min-h-[92px]"
            >
              {brand}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-[18px] text-center text-[13px] text-ink-2">
        Noms de marques affichés sans logos, en attendant les visuels officiels.
      </p>
    </Section>
  );
}
