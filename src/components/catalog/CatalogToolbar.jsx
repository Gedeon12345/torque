import SelectField from "@/components/ui/SelectField";

const sortOptions = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];

export default function CatalogToolbar({ count, sort, onSortChange }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <p role="status" className="text-sm text-ink-2">{count} {count > 1 ? "pièces" : "pièce"}</p>
      <div className="w-full sm:w-56">
        <SelectField id="catalog-sort" label="Trier par" value={sort} options={sortOptions} onChange={onSortChange} placeholder={null} />
      </div>
    </div>
  );
}
