import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label={`${siteConfig.name}, accueil`}
      className={`flex items-center gap-2.5 font-display text-2xl font-extrabold uppercase tracking-[0.06em] ${className}`}
    >
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="16" cy="16" r="4.5" className="fill-accent" />
      </svg>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
