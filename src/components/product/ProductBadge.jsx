const badgeStyles = {
  Nouveau: "bg-ink text-bg",
  Promo: "bg-accent text-white",
};

export default function ProductBadge({ badge, className = "" }) {
  if (!badge) return null;

  return (
    <span className={`rounded-full px-2.5 py-[3px] text-xs font-bold ${badgeStyles[badge]} ${className}`}>
      {badge}
    </span>
  );
}
