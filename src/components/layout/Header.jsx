import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import CountBadge from "@/components/ui/CountBadge";
import IconButton from "@/components/ui/IconButton";
import { mainNavigation } from "@/data/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { useShop } from "@/store/ShopProvider";

const linkBase =
  "rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-ink/7 hover:text-ink";

function DesktopNavItem({ item }) {
  // Les liens d'ancre (#marques) n'ont pas d'état "actif" propre.
  if (item.isAnchor) {
    return (
      <Link to={item.to} className={`${linkBase} text-ink-2`}>
        {item.label}
      </Link>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? "bg-ink/7 text-ink" : "text-ink-2"}`
      }
    >
      {item.label}
    </NavLink>
  );
}

function withCount(label, count) {
  return count > 0 ? `${label}, ${count} ${count > 1 ? "articles" : "article"}` : label;
}

export default function Header() {
  const scrolled = useScrolled(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { favoritesCount, cartCount } = useShop();

  const isSolid = scrolled || menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        isSolid
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-2 px-3 lg:px-8">
        <div className="lg:hidden">
          <IconButton
            label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </IconButton>
        </div>

        <Logo className="flex-1 justify-center lg:flex-none lg:justify-start" />

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Navigation principale">
          {mainNavigation.map((item) => (
            <DesktopNavItem key={item.to} item={item} />
          ))}
        </nav>

        <div className="flex items-center">
          <div className="hidden items-center lg:flex">
            <IconButton as={Link} to="/search" label="Rechercher">
              <Search size={20} />
            </IconButton>
            <IconButton as={Link} to="/favorites" label={withCount("Favoris", favoritesCount)}>
              <Heart size={20} />
              <CountBadge count={favoritesCount} />
            </IconButton>
          </div>
          <IconButton as={Link} to="/cart" label={withCount("Panier", cartCount)}>
            <ShoppingCart size={20} />
            <CountBadge count={cartCount} />
          </IconButton>
        </div>
      </div>

      <MobileMenu open={menuOpen} items={mainNavigation} onNavigate={() => setMenuOpen(false)} />
    </header>
  );
}
