import { useEffect } from "react";
import { siteConfig } from "@/data/site";

const DEFAULT_TITLE = `${siteConfig.name} — Pièces automobiles à Douala`;

/** Titre de l'onglet : "Panier — Torque". Sans argument, restaure le titre par défaut. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${siteConfig.name}` : DEFAULT_TITLE;
  }, [title]);
}
