import { useMemo } from "react";
import Container from "@/components/common/Container";
import PageHeading from "@/components/common/PageHeading";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CategoryChips from "@/components/catalog/CategoryChips";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSortParam } from "@/hooks/useSortParam";
import { sortProducts } from "@/utils/catalog";

export default function ProductsPage() {
  useDocumentTitle("Toutes les pièces");
  const [sort, setSort] = useSortParam();
  const sortedProducts = useMemo(() => sortProducts(products, sort), [sort]);

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading
        title="Toutes les pièces"
        description="Parcourez le catalogue par catégorie ou triez les pièces par prix et par note."
      />
      <CategoryChips />
      <CatalogToolbar count={sortedProducts.length} sort={sort} onSortChange={setSort} />
      <ProductGrid products={sortedProducts} />
    </Container>
  );
}
