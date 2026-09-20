import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import PageHeading from "@/components/common/PageHeading";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useShop } from "@/store/ShopProvider";
import { getProductById } from "@/utils/catalog";

export default function FavoritesPage() {
  useDocumentTitle("Favoris");
  const { favoriteIds } = useShop();
  const favorites = favoriteIds.map(getProductById).filter(Boolean);

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading
        title="Favoris"
        description={favorites.length > 0 ? "Les pièces que vous avez mises de côté." : undefined}
      />
      {favorites.length > 0 ? (
        <ProductGrid products={favorites} />
      ) : (
        <EmptyState
          icon={Heart}
          title="Aucun favori pour l'instant"
          description="Touchez le cœur d'une pièce pour la retrouver ici."
          action={
            <Button as={Link} to="/products">
              Explorer les pièces
            </Button>
          }
        />
      )}
    </Container>
  );
}
