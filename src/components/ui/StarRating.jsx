import { Star } from "lucide-react";

export default function StarRating({ rating, max = 5 }) {
  return (
    <div role="img" aria-label={`Note : ${rating} sur ${max}`} className="flex gap-0.5 text-ink">
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          size={18}
          aria-hidden="true"
          className={index < rating ? "fill-ink" : ""}
        />
      ))}
    </div>
  );
}
