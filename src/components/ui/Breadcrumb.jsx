import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/** items : [{ label, to? }] — le dernier élément est la page courante. */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol role="list" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-ink" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={14} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
