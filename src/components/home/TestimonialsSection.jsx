import { useRef, useState } from "react";
import Section from "@/components/common/Section";
import TestimonialCard from "@/components/home/TestimonialCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

const CARD_GAP_PX = 12;

/** Grille de 3 cartes sur desktop, carousel à défilement (scroll-snap) sur mobile. */
export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!firstCard) return;
    const index = Math.round(track.scrollLeft / (firstCard.offsetWidth + CARD_GAP_PX));
    setActiveIndex(Math.min(index, testimonials.length - 1));
  };

  return (
    <Section aria-labelledby="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        title="Ils nous font confiance"
        description="Avis de démonstration, à remplacer par de vrais retours clients."
      />

      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
      >
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="w-[86%] shrink-0 snap-start md:w-auto">
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="mt-2 flex justify-center gap-1.5 md:hidden">
        {testimonials.map((testimonial, index) => (
          <span
            key={testimonial.id}
            className={`h-[7px] rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-[22px] bg-ink" : "w-[7px] bg-line-strong"
            }`}
          />
        ))}
      </div>
    </Section>
  );
}
