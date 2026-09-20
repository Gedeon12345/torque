import { useState } from "react";

/**
 * Photo du produit (format 4:3). Si le fichier n'existe pas encore,
 * l'illustration de secours du produit est affichée à la place.
 */
export default function ProductImage({ product, loading = "lazy" }) {
  const [photoMissing, setPhotoMissing] = useState(false);
  const { image, placeholder, imageAlt } = product;

  return (
    <img
      src={photoMissing ? placeholder : image}
      alt={imageAlt}
      width="1200"
      height="900"
      loading={loading}
      decoding="async"
      onError={() => setPhotoMissing(true)}
      className={`size-full ${photoMissing ? "object-contain p-[10%]" : "object-cover"}`}
    />
  );
}
