import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { advantages } from "@/data/advantages";
import { fadeUp, revealOnScroll, staggerContainer } from "@/utils/motion";

export default function WhySection() {
  return (
    <Section aria-labelledby="why-title">
      <SectionHeading id="why-title" title="Pourquoi nous choisir ?" />

      <motion.ul
        variants={staggerContainer(0.08)}
        {...revealOnScroll}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line lg:grid-cols-4"
      >
        {advantages.map(({ title, description, icon: Icon }) => (
          <motion.li key={title} variants={fadeUp} className="bg-surface p-5 lg:p-8">
            <span className="flex size-12 items-center justify-center rounded-xl border-[1.5px] border-accent text-accent">
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-[18px] font-display text-[23px] font-bold leading-[1.1]">{title}</h3>
            <p className="mt-1.5 text-sm leading-snug text-ink-2">{description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
