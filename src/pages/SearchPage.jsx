import { Link, useSearchParams } from "react-router-dom";
import { SearchX, X } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import SearchBar from "@/components/common/SearchBar";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useCategories } from "@/hooks/useCategories";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useProducts } from "@/hooks/useProducts";
import { useSortParam } from "@/hooks/useSortParam";

export default function SearchPage() {
  useDocumentTitle("Recherche");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useSortParam();
  const { categories } = useCategories();

  const query = searchParams.get("q") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const { products: results, isLoading, error } = useProducts({ q: query || undefined, brand: brand || undefined, sort, limit: 48 });

  const submitQuery = (nextQuery) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (nextQuery) next.set("q", nextQuery);
      else next.delete("q");
      return next;
    });
  };

  const clearBrand = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("brand");
    setSearchParams(next);
  };

  const title = query ? `Résultats pour « ${query} »` : brand ? `Pièces pour ${brand}` : "Recherche";

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title={title} />
      <SearchBar key={query} id="search-page-input" initialValue={query} onSubmit={submitQuery} />

      {brand && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <button type="button" onClick={clearBrand} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-soft pl-3.5 pr-3 font-medium">
            Marque : {brand}<X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : error ? (
          <ErrorState message={error.message} />
        ) : results.length > 0 ? (
          <>
            <CatalogToolbar count={results.length} sort={sort} onSortChange={setSort} />
            <ProductGrid products={results} />
          </>
        ) : (
          <EmptyState icon={SearchX} title="Aucun résultat" description="Essayez un autre mot, une marque ou parcourez une catégorie."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button key={category.slug} as={Link} to={`/categories/${category.slug}`} variant="ghost" size="compact" className="px-4">{category.name}</Button>
                ))}
              </div>
            } />
        )}
      </div>
    </Container>
  );
}
