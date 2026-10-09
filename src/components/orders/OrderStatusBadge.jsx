const STYLES = {
  pending: "bg-accent-soft text-ink",
  confirmed: "bg-accent-soft text-ink",
  shipped: "bg-ink text-bg",
  delivered: "bg-success text-white",
  cancelled: "bg-tile text-ink-2",
};
const LABELS = { pending: "En attente", confirmed: "Confirmée", shipped: "Expédiée", delivered: "Livrée", cancelled: "Annulée" };

export default function OrderStatusBadge({ status }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${STYLES[status]}`}>{LABELS[status] ?? status}</span>;
}
