import { useState } from "react";
import Container from "@/components/common/Container";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import AdminNav from "@/components/admin/AdminNav";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useAdminList, useAdminMutation } from "@/hooks/useAdminResource";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { api } from "@/utils/apiClient";
import { formatDate, formatPrice } from "@/utils/format";

// Transitions autorisées côté back-end (voir services/orderRules.js) : on ne propose que celles-là.
const NEXT_STATUSES = { pending: ["confirmed", "cancelled"], confirmed: ["shipped", "cancelled"], shipped: ["delivered"], delivered: [], cancelled: [] };
const STATUS_FILTERS = [
  { value: "", label: "Tous les statuts" },
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "shipped", label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
];

export default function AdminOrdersPage() {
  useDocumentTitle("Commandes — Administration");
  const [status, setStatus] = useState("");
  const [version, setVersion] = useState(0);
  const { items: orders, isLoading, error } = useAdminList("/admin/orders", { status, limit: 50, _v: version });
  const { run, isSubmitting } = useAdminMutation();

  const updateStatus = (order, nextStatus) =>
    run(() => api.patch(`/admin/orders/${order.orderNumber}/status`, { status: nextStatus })).then(() => setVersion((v) => v + 1));

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Commandes" />
      <AdminNav />
      <div className="mb-5 w-full sm:w-56">
        <SelectField id="admin-order-status" label="Filtrer par statut" value={status} onChange={setStatus} placeholder={null} options={STATUS_FILTERS} />
      </div>

      {isLoading ? <div className="flex justify-center py-16"><Spinner /></div> : error ? <ErrorState message={error.message} /> : (
        <ul role="list" className="flex flex-col gap-3">
          {orders.map((order) => (
            <li key={order.orderNumber} className="rounded-[16px] border border-line bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{order.orderNumber}</p>
                  <p className="text-sm text-ink-2">{order.user?.email} · {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold">{formatPrice(order.totalCents)}</p>
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
              {NEXT_STATUSES[order.status]?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {NEXT_STATUSES[order.status].map((next) => (
                    <button key={next} type="button" disabled={isSubmitting} onClick={() => updateStatus(order, next)}
                      className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-ink disabled:opacity-50">
                      Passer à « {next} »
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
