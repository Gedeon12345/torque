const NON_BREAKING_SPACE = "\u00a0";
const priceFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

/** 54.9 → "54,90 €" (espaces insécables pour éviter les retours à la ligne). */
export function formatPrice(amount) {
  return priceFormatter.format(amount).replace(/[\u202f\u00a0]/g, NON_BREAKING_SPACE);
}

/** 4.8 → "4,8" */
export function formatRating(rating) {
  return rating.toFixed(1).replace(".", ",");
}
