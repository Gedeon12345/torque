import { useEffect } from "react";
import { siteConfig } from "@/data/site";

const DEFAULT_TITLE = `${siteConfig.name} — Pièces automobiles`;

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${siteConfig.name}` : DEFAULT_TITLE;
  }, [title]);
}
