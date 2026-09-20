import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import CartLine from "@/components/cart/CartLine";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import PageHeading from "@/components/common/PageHeading";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useShop } from "@/store/ShopProvider";
import { getProductById } from "@/utils/catalog";
import { formatPrice } from "@/utils/format";

export default function CartPage() {
  useDocumentTitle("Panier");
  const { cartItems, clearCart } = useShop();
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  const lines = useMemo(
    () =>
      Object.entries(cartItems)
        .map(([id, quantity]) => ({ product: getProductById(id), quantity }))
        .filter((line) => line.product),
    [cartItems],
  );
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce((total, line) => total + line.product.price * line.quantity, 0);

  if (lines.length === 0) {
    return (
      <Container className="pt-24 lg:pt-32">
        <PageHeading title="Panier" />
        <EmptyState
          icon={ShoppingCart}
          title="Votre panier est vide"
          description="Ajoutez des pièces depuis le catalogue, elles apparaîtront ici."
          action={
            <Button as={Link} to="/products">
              Explorer les pièces
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Panier" />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
        <section aria-label="Articles du panier">
          <ul role="list" className="divide-y divide-line border-y border-line">
            {lines.map(({ product, quantity }) => (
              <CartLine key={product.id} product={product} quantity={quantity} />
            ))}
          </ul>
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 inline-flex h-11 items-center text-sm font-medium text-ink-2 transition-colors hover:text-danger"
          >
            Vider le panier
          </button>
        </section>

        <aside
          aria-label="Récapitulatif"
          className="rounded-[20px] border border-line bg-surface p-5 lg:sticky lg:top-24"
        >
          <h2 className="font-display text-2xl font-bold">Récapitulatif</h2>
          <dl className="mt-4 space-y-3 text-[15px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-2">
                Sous-total ({itemCount} {itemCount > 1 ? "articles" : "article"})
              </dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-2">Livraison</dt>
              <dd className="text-right text-ink-2">Calculée à la commande</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-3 text-lg">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <Button size="lg" className="mt-5 w-full" onClick={() => setShowDemoNotice(true)}>
            Commander
          </Button>
          {showDemoNotice && (
            <p role="status" className="mt-3 rounded-[10px] bg-accent-soft px-3.5 py-3 text-sm">
              La commande en ligne n'est pas encore active : cette version est une démonstration.
            </p>
          )}
          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-semibold transition-colors hover:text-accent"
          >
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </Container>
  );
}
