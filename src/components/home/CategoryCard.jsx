import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-4 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-ink md:p-[22px]"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-bg text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon size={24} aria-hidden="true" />
      </span>
      <span>
        <span className="block font-display text-[23px] font-bold leading-[1.1]">{category.name}</span>
        <span className="mt-1 block text-[13px] leading-snug text-ink-2">{category.description}</span>
      </span>
    </Link>
  );
}
