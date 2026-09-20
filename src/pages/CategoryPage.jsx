import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import PageHeading from "@/components/common/PageHeading";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CategoryChips from "@/components/catalog/CategoryChips";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSortParam } from "@/hooks/useSortParam";
import NotFoundPage from "@/pages/NotFoundPage";
import { getCategoryBySlug, getProductsByCategory, sortProducts } from "@/utils/catalog";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const [sort, setSort] = useSortParam();
  const items = useMemo(() => sortProducts(getProductsByCategory(slug), sort), [slug, sort]);
  useDocumentTitle(category?.name);

  if (!category) return <NotFoundPage />;

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title={category.name} description={category.description} />
      <CategoryChips activeSlug={category.slug} />
      {items.length > 0 ? (
        <>
          <CatalogToolbar count={items.length} sort={sort} onSortChange={setSort} />
          <ProductGrid products={items} />
        </>
      ) : (
        <EmptyState
          icon={PackageSearch}
          title="Aucune pièce pour le moment"
          description="Cette catégorie sera bientôt réapprovisionnée."
          action={
            <Button as={Link} to="/products" variant="ghost">
              Voir toutes les pièces
            </Button>
          }
        />
      )}
    </Container>
  );
}
