import { Link, useParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CategoryChips from "@/components/catalog/CategoryChips";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useCategory } from "@/hooks/useCategories";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useProducts } from "@/hooks/useProducts";
import { useSortParam } from "@/hooks/useSortParam";
import NotFoundPage from "@/pages/NotFoundPage";

export default function CategoryPage() {
  const { slug } = useParams();
  const { category, isLoading: categoryLoading, error: categoryError } = useCategory(slug);
  const [sort, setSort] = useSortParam();
  const { products, isLoading: productsLoading, error: productsError } = useProducts({ category: slug, sort, limit: 48 });
  useDocumentTitle(category?.name);

  if (categoryLoading) return <Container className="pt-24 lg:pt-32"><div className="flex justify-center py-16"><Spinner /></div></Container>;
  if (categoryError?.status === 404) return <NotFoundPage />;
  if (categoryError) return <Container className="pt-24 lg:pt-32"><ErrorState message={categoryError.message} /></Container>;

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title={category.name} description={category.description} />
      <CategoryChips activeSlug={category.slug} />
      {productsLoading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : productsError ? (
        <ErrorState message={productsError.message} />
      ) : products.length > 0 ? (
        <>
          <CatalogToolbar count={products.length} sort={sort} onSortChange={setSort} />
          <ProductGrid products={products} />
        </>
      ) : (
        <EmptyState icon={PackageSearch} title="Aucune pièce pour le moment" description="Cette catégorie sera bientôt réapprovisionnée."
          action={<Button as={Link} to="/products" variant="ghost">Voir toutes les pièces</Button>} />
      )}
    </Container>
  );
}
