import { useEffect, useState } from "react";

/** useState sauvegardé dans le localStorage (le panier survit à un rafraîchissement). */
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Stockage indisponible (navigation privée, quota) : l'état reste simplement en mémoire.
    }
  }, [key, value]);

  return [value, setValue];
}
