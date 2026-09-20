import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchX, X } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import PageHeading from "@/components/common/PageHeading";
import SearchBar from "@/components/common/SearchBar";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSortParam } from "@/hooks/useSortParam";
import { searchProducts, sortProducts } from "@/utils/catalog";

const VEHICLE_KEYS = ["brand", "model", "year", "engine"];

function searchWithout(searchParams, keys) {
  const next = new URLSearchParams(searchParams);
  keys.forEach((key) => next.delete(key));
  const text = next.toString();
  return text ? `?${text}` : "";
}

export default function SearchPage() {
  useDocumentTitle("Recherche");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useSortParam();

  const query = searchParams.get("q") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const vehicleLabel = VEHICLE_KEYS.map((key) => searchParams.get(key)).filter(Boolean).join(" · ");

  const results = useMemo(
    () => sortProducts(searchProducts({ query, brand }), sort),
    [query, brand, sort],
  );

  const submitQuery = (nextQuery) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (nextQuery) next.set("q", nextQuery);
      else next.delete("q");
      return next;
    });
  };

  const title = query ? `Résultats pour « ${query} »` : vehicleLabel ? "Pièces pour votre véhicule" : "Recherche";

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title={title} />

      {/* key : le champ se remet à jour si la recherche change depuis ailleurs (ex. le Hero). */}
      <SearchBar key={query} id="search-page-input" initialValue={query} onSubmit={submitQuery} />

      {vehicleLabel && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to={{ search: searchWithout(searchParams, VEHICLE_KEYS) }}
            aria-label={`Retirer le filtre véhicule : ${vehicleLabel}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-soft pl-3.5 pr-3 font-medium"
          >
            Véhicule : {vehicleLabel}
            <X size={14} aria-hidden="true" />
          </Link>
          <span className="text-ink-2">Version démo : les pièces sont filtrées par marque de véhicule.</span>
        </div>
      )}

      <div className="mt-8">
        {results.length > 0 ? (
          <>
            <CatalogToolbar count={results.length} sort={sort} onSortChange={setSort} />
            <ProductGrid products={results} />
          </>
        ) : (
          <EmptyState
            icon={SearchX}
            title="Aucun résultat"
            description="Essayez un autre mot, une marque ou parcourez une catégorie."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.slug}
                    as={Link}
                    to={`/categories/${category.slug}`}
                    variant="ghost"
                    size="compact"
                    className="px-4"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            }
          />
        )}
      </div>
    </Container>
  );
}
