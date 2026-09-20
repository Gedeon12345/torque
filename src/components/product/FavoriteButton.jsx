import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useShop } from "@/store/ShopProvider";

export default function FavoriteButton({ productId, productName, className = "" }) {
  const { isFavorite, toggleFavorite } = useShop();
  const favorite = isFavorite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId)}
      aria-pressed={favorite}
      aria-label={favorite ? `Retirer des favoris : ${productName}` : `Ajouter aux favoris : ${productName}`}
      className={`flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[border-color,transform] hover:border-ink active:scale-90 ${className}`}
    >
      <motion.span
        animate={{ scale: favorite ? [1, 1.35, 1] : 1 }}
        transition={{ duration: 0.35 }}
        className="flex"
      >
        <Heart size={19} aria-hidden="true" className={favorite ? "fill-accent text-accent" : ""} />
      </motion.span>
    </button>
  );
}
