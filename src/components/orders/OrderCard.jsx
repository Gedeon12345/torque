import { Link } from "react-router-dom";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { formatDate, formatPrice } from "@/utils/format";

export default function OrderCard({ order }) {
  return (
    <Link to={`/orders/${order.orderNumber}`} className="flex flex-col gap-3 rounded-[16px] border border-line bg-surface p-4 transition-colors hover:border-ink sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <p className="font-display text-lg font-bold">{order.orderNumber}</p>
        <p className="text-sm text-ink-2">{formatDate(order.createdAt)} · {order.items.length} {order.items.length > 1 ? "articles" : "article"}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold">{formatPrice(order.totalCents)}</p>
        <OrderStatusBadge status={order.status} />
      </div>
    </Link>
  );
}
