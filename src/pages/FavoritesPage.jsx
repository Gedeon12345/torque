import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import PageHeading from "@/components/common/PageHeading";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useShop } from "@/store/ShopProvider";
import { api } from "@/utils/apiClient";

export default function FavoritesPage() {
  useDocumentTitle("Favoris");
  const { favoriteIds } = useShop();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (favoriteIds.length === 0) { setProducts([]); setIsLoading(false); return; }
    setIsLoading(true);
    Promise.all(favoriteIds.map((id) => api.get(`/products/${id}`).catch(() => null)))
      .then((results) => setProducts(results.filter(Boolean)))
      .finally(() => setIsLoading(false));
  }, [favoriteIds.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Favoris" description={products.length > 0 ? "Les pièces que vous avez mises de côté." : undefined} />
      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState icon={Heart} title="Aucun favori pour l'instant" description="Touchez le cœur d'une pièce pour la retrouver ici."
          action={<Button as={Link} to="/products">Explorer les pièces</Button>} />
      )}
    </Container>
  );
}
