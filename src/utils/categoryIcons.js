import { ArrowDownUp, CircleDot, Cog, Disc3, Lightbulb, Snowflake, Wind, Zap } from "lucide-react";

// Doit couvrir toutes les valeurs de `icon` renvoyées par l'API (voir seed du back-end).
const ICONS = { Disc3, Cog, ArrowDownUp, Zap, Lightbulb, Snowflake, Wind, CircleDot };

/** Renvoie le composant d'icône pour une catégorie ; Cog par défaut si la clé est inconnue. */
export function getCategoryIcon(iconKey) {
  return ICONS[iconKey] ?? Cog;
}
