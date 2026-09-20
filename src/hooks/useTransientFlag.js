import { useCallback, useEffect, useRef, useState } from "react";

/** Booléen qui passe à true puis revient à false tout seul (retour visuel d'une action). */
export function useTransientFlag(duration = 1400) {
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const trigger = useCallback(() => {
    setActive(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(false), duration);
  }, [duration]);

  return [active, trigger];
}
