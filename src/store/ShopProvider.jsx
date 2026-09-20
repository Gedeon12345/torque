import { createContext, useCallback, useContext, useMemo } from "react";
import { usePersistentState } from "@/hooks/usePersistentState";

const ShopContext = createContext(null);

/**
 * État local du panier et des favoris (aucun backend), sauvegardé dans le navigateur.
 * cartItems : { [productId]: quantité }
 */
export function ShopProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = usePersistentState("torque:favorites", []);
  const [cartItems, setCartItems] = usePersistentState("torque:cart", {});

  const toggleFavorite = useCallback(
    (productId) => {
      setFavoriteIds((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId],
      );
    },
    [setFavoriteIds],
  );

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      setCartItems((current) => ({
        ...current,
        [productId]: (current[productId] ?? 0) + quantity,
      }));
    },
    [setCartItems],
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      setCartItems((current) => {
        const { [productId]: _removed, ...rest } = current;
        return quantity > 0 ? { ...rest, [productId]: quantity } : rest;
      });
    },
    [setCartItems],
  );

  const removeFromCart = useCallback((productId) => updateQuantity(productId, 0), [updateQuantity]);
  const clearCart = useCallback(() => setCartItems({}), [setCartItems]);

  const value = useMemo(
    () => ({
      favoriteIds,
      cartItems,
      favoritesCount: favoriteIds.length,
      cartCount: Object.values(cartItems).reduce((total, quantity) => total + quantity, 0),
      isFavorite: (productId) => favoriteIds.includes(productId),
      toggleFavorite,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [favoriteIds, cartItems, toggleFavorite, addToCart, updateQuantity, removeFromCart, clearCart],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop doit être utilisé dans <ShopProvider>.");
  return context;
}
