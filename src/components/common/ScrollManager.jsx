import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Gère le défilement à chaque navigation :
 * - vers l'ancre (#marques) si elle existe sur la page ;
 * - sinon, retour en haut de page.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return null;
}
