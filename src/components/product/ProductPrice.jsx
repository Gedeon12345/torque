import { formatPrice } from "@/utils/format";

const priceSizes = {
  card: "text-base font-bold min-[400px]:text-lg md:text-xl",
  large: "text-3xl font-bold",
};

export default function ProductPrice({ price, oldPrice, size = "card" }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={priceSizes[size]}>{formatPrice(price)}</span>
      {oldPrice && (
        <s className="text-[13px] text-ink-2">
          <span className="sr-only">Ancien prix : </span>
          {formatPrice(oldPrice)}
        </s>
      )}
    </p>
  );
}
