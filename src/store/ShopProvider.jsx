import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

/**
 * État local du panier et des favoris (aucun backend).
 * cartItems : { [productId]: quantité }
 */
export function ShopProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const toggleFavorite = useCallback((productId) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const addToCart = useCallback((productId) => {
    setCartItems((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      cartItems,
      favoritesCount: favoriteIds.length,
      cartCount: Object.values(cartItems).reduce((total, qty) => total + qty, 0),
      isFavorite: (productId) => favoriteIds.includes(productId),
      toggleFavorite,
      addToCart,
    }),
    [favoriteIds, cartItems, toggleFavorite, addToCart],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop doit être utilisé dans <ShopProvider>.");
  return context;
}
