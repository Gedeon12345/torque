import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

const chipClass =
  "flex h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors";

function Chip({ to, active, children }) {
  return (
    <li>
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        className={`${chipClass} ${
          active ? "border-ink bg-ink text-bg" : "border-line-strong text-ink hover:border-ink"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

/** Filtres par catégorie : défilement horizontal sur mobile, retour à la ligne sur desktop. */
export default function CategoryChips({ activeSlug = null }) {
  return (
    <nav aria-label="Catégories">
      <ul
        role="list"
        className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        <Chip to="/products" active={activeSlug === null}>
          Toutes
        </Chip>
        {categories.map((category) => (
          <Chip key={category.slug} to={`/categories/${category.slug}`} active={activeSlug === category.slug}>
            {category.name}
          </Chip>
        ))}
      </ul>
    </nav>
  );
}
