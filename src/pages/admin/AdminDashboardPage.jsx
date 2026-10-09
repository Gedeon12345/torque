import Container from "@/components/common/Container";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import AdminNav from "@/components/admin/AdminNav";
import Spinner from "@/components/ui/Spinner";
import { useAdminStats } from "@/hooks/useAdminResource";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatPrice } from "@/utils/format";

function StatCard({ label, value }) {
  return (
    <div className="rounded-[16px] border border-line bg-surface p-5">
      <p className="text-sm text-ink-2">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  useDocumentTitle("Administration");
  const { stats, isLoading, error } = useAdminStats();

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Administration" />
      <AdminNav />
      {isLoading ? <div className="flex justify-center py-16"><Spinner /></div> : error ? <ErrorState message={error.message} /> : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Commandes" value={stats.orders.total} />
          <StatCard label="Chiffre d'affaires" value={formatPrice(stats.revenueCents)} />
          <StatCard label="Clients" value={stats.customers} />
          <StatCard label="Produits actifs" value={stats.products.active} />
          <StatCard label="En attente" value={stats.orders.byStatus.pending} />
          <StatCard label="Confirmées" value={stats.orders.byStatus.confirmed} />
          <StatCard label="Stock limité" value={stats.products.lowStock} />
          <StatCard label="Épuisés" value={stats.products.outOfStock} />
        </div>
      )}
    </Container>
  );
}
