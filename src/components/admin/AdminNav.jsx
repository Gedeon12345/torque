import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Tableau de bord", end: true },
  { to: "/admin/products", label: "Produits" },
  { to: "/admin/orders", label: "Commandes" },
];

export default function AdminNav() {
  return (
    <nav className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end}
          className={({ isActive }) => `flex h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${isActive ? "border-ink bg-ink text-bg" : "border-line-strong text-ink hover:border-ink"}`}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
