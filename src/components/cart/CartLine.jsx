import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { useShop } from "@/store/ShopProvider";
import { formatPrice } from "@/utils/format";

export default function CartLine({ product, quantity }) {
  const { updateQuantity, removeFromCart } = useShop();
  const { id, name, brand, image, imageAlt, price } = product;

  return (
    <li className="flex gap-4 py-5">
      <div className="size-24 shrink-0 rounded-xl bg-tile sm:size-28">
        <img
          src={image}
          alt={imageAlt}
          width="200"
          height="150"
          loading="lazy"
          className="size-full object-contain p-2"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink-2">{brand}</p>
            <Link to={`/products/${id}`} className="font-semibold leading-tight hover:text-accent">
              {name}
            </Link>
          </div>
          <p className="shrink-0 font-bold">{formatPrice(price * quantity)}</p>
        </div>

        {quantity > 1 && <p className="text-[13px] text-ink-2">{formatPrice(price)} l'unité</p>}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <QuantityStepper
            value={quantity}
            label={`Quantité : ${name}`}
            onChange={(next) => updateQuantity(id, next)}
          />
          <button
            type="button"
            onClick={() => removeFromCart(id)}
            className="inline-flex h-11 items-center gap-1.5 px-1 text-sm font-medium text-ink-2 transition-colors hover:text-danger"
          >
            <Trash2 size={16} aria-hidden="true" />
            Retirer
            <span className="sr-only"> : {name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
