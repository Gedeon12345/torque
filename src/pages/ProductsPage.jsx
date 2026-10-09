import Container from "@/components/common/Container";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CategoryChips from "@/components/catalog/CategoryChips";
import ProductGrid from "@/components/product/ProductGrid";
import Spinner from "@/components/ui/Spinner";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useProducts } from "@/hooks/useProducts";
import { useSortParam } from "@/hooks/useSortParam";

export default function ProductsPage() {
  useDocumentTitle("Toutes les pièces");
  const [sort, setSort] = useSortParam();
  const { products, isLoading, error } = useProducts({ sort, limit: 48 });

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Toutes les pièces" description="Parcourez le catalogue par catégorie ou triez les pièces par prix et par note." />
      <CategoryChips />
      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : error ? (
        <ErrorState message={error.message} />
      ) : (
        <>
          <CatalogToolbar count={products.length} sort={sort} onSortChange={setSort} />
          <ProductGrid products={products} />
        </>
      )}
    </Container>
  );
}
