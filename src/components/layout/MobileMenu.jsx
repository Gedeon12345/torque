import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, LogOut, Package, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/AuthProvider";

export default function MobileMenu({ open, items, onNavigate }) {
  const { isAuthenticated, user, logout } = useAuth();

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
          <ul className="px-5 pb-3">
            {items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={onNavigate} className="flex items-center justify-between border-b border-line py-3.5 font-display text-[26px] font-bold">
                  {item.label}
                  <ArrowRight size={18} aria-hidden="true" className="text-ink-2" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-1 px-5 pb-6">
            {isAuthenticated ? (
              <>
                <p className="py-2 text-sm text-ink-2">Connecté·e en tant que {user.firstName}</p>
                <Link to="/account" onClick={onNavigate} className="flex items-center gap-2.5 py-2.5 font-semibold">
                  <User size={18} aria-hidden="true" /> Mon compte
                </Link>
                <Link to="/orders" onClick={onNavigate} className="flex items-center gap-2.5 py-2.5 font-semibold">
                  <Package size={18} aria-hidden="true" /> Mes commandes
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" onClick={onNavigate} className="flex items-center gap-2.5 py-2.5 font-semibold text-accent">
                    <LayoutDashboard size={18} aria-hidden="true" /> Dashboard admin
                  </Link>
                )}
                <button type="button" onClick={() => { logout(); onNavigate(); }} className="flex items-center gap-2.5 py-2.5 font-semibold text-danger">
                  <LogOut size={18} aria-hidden="true" /> Se déconnecter
                </button>
              </>
            ) : (
              <Link to="/login" onClick={onNavigate} className="flex items-center gap-2.5 py-2.5 font-semibold text-accent">
                <User size={18} aria-hidden="true" /> Se connecter
              </Link>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
