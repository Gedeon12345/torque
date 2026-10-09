import { useEffect, useState } from "react";
import { api } from "@/utils/apiClient";

/**
 * Le panier ne stocke que des { productId: quantité } ; cette page a besoin du nom, du prix
 * et du stock actuels. On recharge donc chaque produit depuis l'API à l'ouverture du panier.
 */
export function useCartProducts(cartItems) {
  const ids = Object.keys(cartItems);
  const key = ids.join(",");
  const [state, setState] = useState({ lines: [], isLoading: true, error: null });

  useEffect(() => {
    if (ids.length === 0) {
      setState({ lines: [], isLoading: false, error: null });
      return undefined;
    }
    let cancelled = false;
    setState((current) => ({ ...current, isLoading: true }));

    Promise.all(ids.map((id) => api.get(`/products/${id}`).catch(() => null)))
      .then((products) => {
        if (cancelled) return;
        const lines = products
          .map((product, index) => (product ? { product, quantity: cartItems[ids[index]] } : null))
          .filter(Boolean);
        setState({ lines, isLoading: false, error: null });
      })
      .catch((error) => !cancelled && setState({ lines: [], isLoading: false, error }));

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
