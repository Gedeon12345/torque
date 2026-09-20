/** Variantes Framer Motion partagées (apparition douce, cascade). */
export const staggerContainer = (stagger = 0.07, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/** Props à étaler sur un conteneur qui s'anime quand il entre dans l'écran. */
export const revealOnScroll = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.15 },
};
