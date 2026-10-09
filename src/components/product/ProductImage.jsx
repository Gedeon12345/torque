import { useState } from "react";
import { getCategoryIcon } from "@/utils/categoryIcons";

/**
 * Photo du produit. Si elle échoue à charger (pas encore déposée dans public/products/
 * côté back-end), une icône de catégorie s'affiche à la place, pour que la page reste complète.
 */
export default function ProductImage({ product, categoryIcon, loading = "lazy", className = "" }) {
  const [broken, setBroken] = useState(false);
  const Icon = getCategoryIcon(categoryIcon);

  if (broken) {
    return (
      <div className={`flex size-full items-center justify-center text-ink-2 ${className}`}>
        <Icon size={48} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={product.imageUrl}
      alt={product.imageAlt}
      loading={loading}
      decoding="async"
      onError={() => setBroken(true)}
      className={`size-full object-cover ${className}`}
    />
  );
}
