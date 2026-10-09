import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import CartLine from "@/components/cart/CartLine";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { useCartProducts } from "@/hooks/useCartProducts";
import { useCreateOrder } from "@/hooks/useOrders";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useShop } from "@/store/ShopProvider";
import { ApiRequestError } from "@/utils/apiClient";
import { formatPrice } from "@/utils/format";

const EMPTY_ADDRESS = { fullName: "", phone: "", line1: "", line2: "", city: "", postalCode: "", country: "" };

export default function CartPage() {
  useDocumentTitle("Panier");
  const { cartItems, clearCart } = useShop();
  const { lines, isLoading, error } = useCartProducts(cartItems);
  const { createOrder, isSubmitting } = useCreateOrder();
  const navigate = useNavigate();

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [formError, setFormError] = useState(null);

  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotalCents = useMemo(() => lines.reduce((total, line) => total + line.product.priceCents * line.quantity, 0), [lines]);

  const set = (field) => (event) => setAddress((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    try {
      const order = await createOrder({
        items: lines.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        shippingAddress: Object.fromEntries(Object.entries(address).filter(([, v]) => v !== "")),
      });
      clearCart();
      navigate(`/orders/${order.orderNumber}`);
    } catch (err) {
      setFormError(err instanceof ApiRequestError ? err.message : "Impossible de passer la commande.");
    }
  };

  if (isLoading) return <Container className="pt-24 lg:pt-32"><div className="flex justify-center py-16"><Spinner /></div></Container>;
  if (error) return <Container className="pt-24 lg:pt-32"><ErrorState message={error.message} /></Container>;

  if (lines.length === 0) {
    return (
      <Container className="pt-24 lg:pt-32">
        <PageHeading title="Panier" />
        <EmptyState icon={ShoppingCart} title="Votre panier est vide" description="Ajoutez des pièces depuis le catalogue, elles apparaîtront ici."
          action={<Button as={Link} to="/products">Explorer les pièces</Button>} />
      </Container>
    );
  }

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Panier" />
      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12">
        <div>
          <ul role="list" className="divide-y divide-line border-y border-line">
            {lines.map(({ product, quantity }) => <CartLine key={product.id} product={product} quantity={quantity} />)}
          </ul>
          <button type="button" onClick={clearCart} className="mt-4 inline-flex h-11 items-center text-sm font-medium text-ink-2 transition-colors hover:text-danger">
            Vider le panier
          </button>

          <div className="mt-8 rounded-[20px] border border-line bg-surface p-5 sm:p-7">
            <h2 className="font-display text-2xl font-bold">Adresse de livraison</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField id="addr-name" label="Nom complet" required value={address.fullName} onChange={set("fullName")} />
              <TextField id="addr-phone" label="Téléphone" required value={address.phone} onChange={set("phone")} />
              <TextField id="addr-line1" label="Adresse" required className="sm:col-span-2" value={address.line1} onChange={set("line1")} />
              <TextField id="addr-line2" label="Complément (facultatif)" className="sm:col-span-2" value={address.line2} onChange={set("line2")} />
              <TextField id="addr-city" label="Ville" required value={address.city} onChange={set("city")} />
              <TextField id="addr-postal" label="Code postal" value={address.postalCode} onChange={set("postalCode")} />
              <TextField id="addr-country" label="Pays" required className="sm:col-span-2" value={address.country} onChange={set("country")} />
            </div>
          </div>
        </div>

        <aside className="rounded-[20px] border border-line bg-surface p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-bold">Récapitulatif</h2>
          <dl className="mt-4 space-y-3 text-[15px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-2">Sous-total ({itemCount} {itemCount > 1 ? "articles" : "article"})</dt>
              <dd className="font-semibold">{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-2">Livraison</dt>
              <dd className="text-right text-ink-2">Calculée à la validation</dd>
            </div>
          </dl>

          {formError && <p role="alert" className="mt-4 rounded-[10px] bg-accent-soft px-3.5 py-3 text-sm text-danger">{formError}</p>}

          <Button type="submit" size="lg" disabled={isSubmitting} className="mt-5 w-full">
            {isSubmitting ? "Commande en cours…" : "Commander"}
          </Button>
          <Link to="/products" className="mt-4 block text-center text-sm font-semibold transition-colors hover:text-accent">Continuer mes achats</Link>
        </aside>
      </form>
    </Container>
  );
}
