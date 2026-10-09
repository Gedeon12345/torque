import { useParams } from "react-router-dom";
import { Check } from "lucide-react";
import Container from "@/components/common/Container";
import ErrorState from "@/components/common/ErrorState";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Spinner from "@/components/ui/Spinner";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useOrder } from "@/hooks/useOrders";
import { formatDate, formatPrice } from "@/utils/format";

const TIMELINE_STATUSES = ["pending", "confirmed", "shipped", "delivered"];

export default function OrderDetailPage() {
  const { idOrNumber } = useParams();
  const { order, isLoading, error } = useOrder(idOrNumber);
  useDocumentTitle(order ? `Commande ${order.orderNumber}` : "Commande");

  if (isLoading) return <Container className="pt-24 lg:pt-32"><div className="flex justify-center py-16"><Spinner /></div></Container>;
  if (error || !order) return <Container className="pt-24 lg:pt-32"><ErrorState message={error?.message ?? "Commande introuvable"} /></Container>;

  const currentIndex = TIMELINE_STATUSES.indexOf(order.status);

  return (
    <Container className="pt-24 lg:pt-32">
      <Breadcrumb items={[{ label: "Mes commandes", to: "/orders" }, { label: order.orderNumber }]} />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold leading-none">{order.orderNumber}</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="mt-1.5 text-ink-2">Passée le {formatDate(order.createdAt)}</p>

      {order.status !== "cancelled" && (
        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {TIMELINE_STATUSES.map((status, index) => (
            <li key={status} className={`flex items-center gap-2 text-sm font-semibold ${index <= currentIndex ? "text-ink" : "text-ink-2"}`}>
              <span className={`flex size-6 items-center justify-center rounded-full ${index <= currentIndex ? "bg-ink text-bg" : "bg-tile"}`}>
                {index < currentIndex ? <Check size={14} /> : index + 1}
              </span>
              {{ pending: "En attente", confirmed: "Confirmée", shipped: "Expédiée", delivered: "Livrée" }[status]}
            </li>
          ))}
        </ol>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <ul role="list" className="divide-y divide-line border-y border-line">
          {order.items.map((item) => (
            <li key={item.reference} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-[13px] font-semibold text-ink-2">{item.brand}</p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-ink-2">Quantité : {item.quantity}</p>
              </div>
              <p className="font-bold">{formatPrice(item.lineTotalCents)}</p>
            </li>
          ))}
        </ul>

        <aside className="rounded-[20px] border border-line bg-surface p-5">
          <h2 className="font-display text-xl font-bold">Livraison</h2>
          <address className="mt-2 not-italic text-ink-2">
            {order.shippingAddress.fullName}<br />
            {order.shippingAddress.line1}<br />
            {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
            {order.shippingAddress.city} {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}<br />
            {order.shippingAddress.phone}
          </address>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[15px]">
            <div className="flex justify-between"><dt className="text-ink-2">Sous-total</dt><dd>{formatPrice(order.subtotalCents)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-2">Livraison</dt><dd>{order.shippingCents > 0 ? formatPrice(order.shippingCents) : "Offerte"}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 text-lg font-bold"><dt>Total</dt><dd>{formatPrice(order.totalCents)}</dd></div>
          </dl>
        </aside>
      </div>
    </Container>
  );
}
