import StarRating from "@/components/ui/StarRating";

export default function TestimonialCard({ testimonial }) {
  const { firstName, rating, comment } = testimonial;

  return (
    <figure className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-[22px]">
      <StarRating rating={rating} />
      <blockquote className="text-[17px] leading-[1.55]">« {comment} »</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full bg-tile font-display text-xl font-bold"
        >
          {firstName[0]}
        </span>
        <span>
          <span className="block text-[15px] font-semibold">{firstName}</span>
          <span className="text-[13px] text-ink-2">Avis de démonstration</span>
        </span>
      </figcaption>
    </figure>
  );
}
