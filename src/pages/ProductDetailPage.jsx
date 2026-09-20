import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ShoppingCart, Star } from "lucide-react";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FavoriteButton from "@/components/product/FavoriteButton";
import ProductBadge from "@/components/product/ProductBadge";
import ProductImage from "@/components/product/ProductImage";
import ProductGrid from "@/components/product/ProductGrid";
import ProductPrice from "@/components/product/ProductPrice";
import StockStatus from "@/components/product/StockStatus";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import QuantityStepper from "@/components/ui/QuantityStepper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useTransientFlag } from "@/hooks/useTransientFlag";
import NotFoundPage from "@/pages/NotFoundPage";
import { useShop } from "@/store/ShopProvider";
import { getCategoryBySlug, getDiscountPercent, getProductById, getRelatedProducts } from "@/utils/catalog";
import { formatRating } from "@/utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, flagAsAdded] = useTransientFlag(1800);
  useDocumentTitle(product?.name);

  if (!product) return <NotFoundPage />;

  const category = getCategoryBySlug(product.category);
  const discount = getDiscountPercent(product);
  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    flagAsAdded();
  };

  return (
    <>
      <Container className="pt-24 lg:pt-28">
        <Breadcrumb
          items={[
            { label: "Accueil", to: "/" },
            { label: "Pièces", to: "/products" },
            { label: category.name, to: `/categories/${category.slug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-tile">
            <ProductImage key={product.id} product={product} loading="eager" />
            <ProductBadge badge={product.badge} className="absolute left-4 top-4" />
            <FavoriteButton
              productId={product.id}
              productName={product.name}
              className="absolute right-3 top-3"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-semibold text-ink-2">{product.brand}</p>
            <h1 className="font-display text-[length:clamp(36px,7vw,56px)] font-bold leading-none">{product.name}</h1>

            <p className="flex items-center gap-[5px] text-sm text-ink-2">
              <Star size={16} aria-hidden="true" className="fill-ink text-ink" />
              <span className="font-bold text-ink">{formatRating(product.rating)}</span>
              <span>({product.reviewCount} avis)</span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <ProductPrice price={product.price} oldPrice={product.oldPrice} size="large" />
              {discount > 0 && (
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-sm font-bold text-accent">
                  −{discount} %
                </span>
              )}
            </div>

            <StockStatus stock={product.stock} />
            <p className="max-w-[56ch] text-ink-2">{product.description}</p>

            <div>
              <h2 className="mb-2 font-display text-xl font-bold">Compatibilité</h2>
              <ul role="list" className="space-y-1.5 text-[15px]">
                {product.compatibility.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" className="text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <Button
                size="lg"
                variant={justAdded ? "success" : "primary"}
                onClick={handleAddToCart}
                className="min-w-[210px] flex-1 sm:flex-none"
              >
                {justAdded ? <Check size={20} aria-hidden="true" /> : <ShoppingCart size={20} aria-hidden="true" />}
                {justAdded ? "Ajouté au panier" : "Ajouter au panier"}
              </Button>
            </div>
            <p role="status" className="sr-only">
              {justAdded ? `${product.name} ajouté au panier` : ""}
            </p>

            <p className="text-[13px] text-ink-2">Référence : {product.reference}</p>
          </div>
        </div>
      </Container>

      {relatedProducts.length > 0 && (
        <Section aria-labelledby="related-title">
          <SectionHeading
            id="related-title"
            title="Dans la même catégorie"
            action={
              <Link
                to={`/categories/${category.slug}`}
                className="border-b-2 border-accent pb-0.5 font-semibold transition-colors hover:text-accent"
              >
                Voir toute la catégorie
              </Link>
            }
          />
          <ProductGrid products={relatedProducts} />
        </Section>
      )}
    </>
  );
}
