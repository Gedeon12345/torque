const labels = { "in-stock": "En stock", "low-stock": "Stock limité", "out-of-stock": "Épuisé" };

export default function StockStatus({ stock }) {
  return (
    <p className={`flex items-center gap-[7px] text-[13px] font-semibold ${stock === "in-stock" ? "text-success" : stock === "low-stock" ? "text-danger" : "text-ink-2"}`}>
      <span aria-hidden="true" className="size-2 rounded-full bg-current" />
      {labels[stock] ?? stock}
    </p>
  );
}
