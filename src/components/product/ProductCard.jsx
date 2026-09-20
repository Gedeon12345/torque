import { Check, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import FavoriteButton from "@/components/product/FavoriteButton";
import ProductBadge from "@/components/product/ProductBadge";
import ProductImage from "@/components/product/ProductImage";
import ProductPrice from "@/components/product/ProductPrice";
import StockStatus from "@/components/product/StockStatus";
import Button from "@/components/ui/Button";
import { useTransientFlag } from "@/hooks/useTransientFlag";
import { useShop } from "@/store/ShopProvider";
import { formatRating } from "@/utils/format";

export default function ProductCard({ product }) {
  const { id, name, brand, price, oldPrice, rating, reviewCount, stock, badge, compatibility } =
    product;
  const { addToCart } = useShop();
  const [justAdded, flagAsAdded] = useTransientFlag();

  const handleAddToCart = () => {
    addToCart(id);
    flagAsAdded();
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_22px_44px_-24px_rgba(20,24,32,0.4)]">
      <div className="relative aspect-[4/3] bg-tile">
        <ProductImage product={product} />
        <ProductBadge badge={badge} className="absolute left-2.5 top-2.5" />
        <FavoriteButton productId={id} productName={name} className="absolute right-2 top-2" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 md:gap-[7px] md:p-4">
        <p className="text-[13px] font-semibold text-ink-2">{brand}</p>
        <h3 className="text-base font-semibold leading-tight md:text-[17px]">
          <Link to={`/products/${id}`} className="hover:text-accent">
            {name}
          </Link>
        </h3>

        <p className="flex gap-1.5 text-[13px] leading-snug text-ink-2">
          <Check size={15} strokeWidth={2.4} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
          <span>
            <span className="sr-only">Compatibilité : </span>
            {compatibility.join(", ")}
          </span>
        </p>

        <p className="flex items-center gap-[5px] text-[13px] text-ink-2">
          <Star size={15} aria-hidden="true" className="fill-ink text-ink" />
          <span className="font-bold text-ink">{formatRating(rating)}</span>
          <span>({reviewCount} avis)</span>
        </p>

        <StockStatus stock={stock} />
        <div className="mt-1">
          <ProductPrice price={price} oldPrice={oldPrice} />
        </div>

        <div className="mt-auto flex gap-2 pt-2.5">
          <Button as={Link} to={`/products/${id}`} variant="ghost" size="compact" className="flex-1">
            Voir
          </Button>
          <Button
            size="icon"
            variant={justAdded ? "success" : "primary"}
            onClick={handleAddToCart}
            aria-label={justAdded ? `${name} ajouté au panier` : `Ajouter au panier : ${name}`}
          >
            {justAdded ? <Check size={20} aria-hidden="true" /> : <ShoppingCart size={20} aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </article>
  );
}
