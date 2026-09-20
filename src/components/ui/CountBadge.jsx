import { motion } from "framer-motion";

/** Pastille de compteur. Rebondit à chaque changement de valeur. */
export default function CountBadge({ count }) {
  if (count <= 0) return null;

  return (
    <motion.span
      key={count}
      aria-hidden="true"
      initial={{ scale: 1.6 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[11px] font-bold leading-none text-white"
    >
      {count}
    </motion.span>
  );
}
