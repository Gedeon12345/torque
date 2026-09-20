import { stockLabels } from "@/data/products";

export default function StockStatus({ stock }) {
  return (
    <p
      className={`flex items-center gap-[7px] text-[13px] font-semibold ${
        stock === "low-stock" ? "text-danger" : "text-success"
      }`}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-current" />
      {stockLabels[stock]}
    </p>
  );
}
