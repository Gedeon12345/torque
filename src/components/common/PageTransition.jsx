import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

/** Fondu à chaque changement de page (opacité seule : aucun effet sur le défilement). */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
