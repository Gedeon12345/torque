import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import OrderCard from "@/components/orders/OrderCard";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersPage() {
  useDocumentTitle("Mes commandes");
  const { orders, isLoading, error } = useOrders();

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Mes commandes" />
      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : error ? (
        <ErrorState message={error.message} />
      ) : orders.length === 0 ? (
        <EmptyState icon={Package} title="Aucune commande pour l'instant" description="Vos commandes passées apparaîtront ici." action={<Button as={Link} to="/products">Explorer les pièces</Button>} />
      ) : (
        <ul role="list" className="flex flex-col gap-3">
          {orders.map((order) => <li key={order.orderNumber}><OrderCard order={order} /></li>)}
        </ul>
      )}
    </Container>
  );
}
