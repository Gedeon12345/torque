import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "@/components/common/Container";
import HeroDisc from "@/components/home/HeroDisc";
import HeroSearch from "@/components/home/HeroSearch";
import { trustPoints } from "@/data/site";
import { fadeUp, staggerContainer } from "@/utils/motion";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Sur très grand écran, le disque reste ancré à ce cadre de 1440 px et non au bord de la fenêtre. */}
      <div className="relative mx-auto flex max-w-[1440px] flex-col pb-[116px] pt-[72px] lg:block lg:min-h-[720px] lg:pb-[150px] lg:pt-[136px]">
        <Container>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="max-w-[560px] lg:max-w-[520px]"
          >
            <h1
              id="hero-title"
              className="font-display text-[length:clamp(50px,13.5vw,92px)] font-extrabold uppercase leading-[0.92] text-balance"
            >
              <motion.span variants={fadeUp} className="block">
                Les bonnes pièces.
              </motion.span>
              <motion.span variants={fadeUp} className="block">
                Pour votre véhicule.
              </motion.span>
            </h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-[46ch] text-lg text-ink-2">
              Trouvez facilement des pièces automobiles fiables, adaptées à votre marque, votre modèle
              et votre année.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <HeroSearch />
            </motion.div>

            <motion.ul
 role="list"
              variants={fadeUp}
              className="mt-[22px] grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-medium text-ink-2 lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-3"
            >
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-[7px]">
                  <Check size={18} strokeWidth={2.4} aria-hidden="true" className="text-accent" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>

        {/* Mobile : le disque passe au-dessus du texte, fondu vers le bas. Desktop : à droite, débordant. */}
        <div
          aria-hidden="true"
          className="relative order-first mb-2 h-[220px] [mask-image:linear-gradient(#000_62%,transparent)] lg:absolute lg:right-[calc(-1*clamp(70px,8vw,150px))] lg:top-1/2 lg:order-none lg:mb-0 lg:aspect-square lg:h-auto lg:w-[clamp(480px,54vw,800px)] lg:-translate-y-[52%] lg:[mask-image:none]"
        >
          <HeroDisc className="absolute -right-[150px] top-1.5 size-[430px] lg:right-0 lg:top-0 lg:size-full" />
        </div>
      </div>
    </section>
  );
}
