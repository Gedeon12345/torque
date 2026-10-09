const NON_BREAKING_SPACE = "\u00a0";
const priceFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

/** 54.9 → "54,90 €" (espaces insécables pour éviter les retours à la ligne). Accepte centimes ou euros. */
export function formatPrice(amountCents) {
  return priceFormatter.format(amountCents / 100).replace(/[\u202f\u00a0]/g, NON_BREAKING_SPACE);
}

/** 4.8 → "4,8" */
export function formatRating(rating) {
  return Number(rating ?? 0).toFixed(1).replace(".", ",");
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
