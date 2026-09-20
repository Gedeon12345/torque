import { motion } from "framer-motion";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { stockLabels } from "@/data/products";
import { useTransientFlag } from "@/hooks/useTransientFlag";
import { useShop } from "@/store/ShopProvider";
import { formatPrice, formatRating } from "@/utils/format";

const badgeStyles = {
  Nouveau: "bg-ink text-bg",
  Promo: "bg-accent text-white",
};

export default function ProductCard({ product }) {
  const { id, name, brand, image, imageAlt, price, oldPrice, rating, reviewCount, stock, badge, compatibility } =
    product;
  const { isFavorite, toggleFavorite, addToCart } = useShop();
  const [justAdded, flagAsAdded] = useTransientFlag();
  const favorite = isFavorite(id);

  const handleAddToCart = () => {
    addToCart(id);
    flagAsAdded();
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_22px_44px_-24px_rgba(20,24,32,0.4)]">
      <div className="relative aspect-[4/3] bg-tile">
        <img
          src={image}
          alt={imageAlt}
          width="200"
          height="150"
          loading="lazy"
          decoding="async"
          className="size-full object-contain p-[10%]"
        />

        {badge && (
          <span className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-[3px] text-xs font-bold ${badgeStyles[badge]}`}>
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          aria-pressed={favorite}
          aria-label={favorite ? `Retirer des favoris : ${name}` : `Ajouter aux favoris : ${name}`}
          className="absolute right-2 top-2 flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[border-color,transform] hover:border-ink active:scale-90"
        >
          <motion.span
            animate={{ scale: favorite ? [1, 1.35, 1] : 1 }}
            transition={{ duration: 0.35 }}
            className="flex"
          >
            <Heart size={19} aria-hidden="true" className={favorite ? "fill-accent text-accent" : ""} />
          </motion.span>
        </button>
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

        <p
          className={`flex items-center gap-[7px] text-[13px] font-semibold ${
            stock === "low-stock" ? "text-danger" : "text-success"
          }`}
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-current" />
          {stockLabels[stock]}
        </p>

        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-bold min-[400px]:text-lg md:text-xl">{formatPrice(price)}</span>
          {oldPrice && (
            <s className="text-[13px] text-ink-2">
              <span className="sr-only">Ancien prix : </span>
              {formatPrice(oldPrice)}
            </s>
          )}
        </p>

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
