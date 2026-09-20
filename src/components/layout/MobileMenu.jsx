import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu({ open, items, onNavigate }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Menu mobile"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden border-t border-line lg:hidden"
        >
          <ul role="list" className="px-5 pb-5">
            {items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className="flex items-center justify-between border-b border-line py-3.5 font-display text-[26px] font-bold"
                >
                  {item.label}
                  <ArrowRight size={18} aria-hidden="true" className="text-ink-2" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
