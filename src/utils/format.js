const NON_BREAKING_SPACE = "\u00a0";
const priceFormatter = new Intl.NumberFormat("fr-FR");

/** 35000 → "35 000 FCFA" (espaces insécables pour éviter les retours à la ligne). */
export function formatPrice(amount) {
  const digits = priceFormatter.format(amount).replace(/[\u202f\u00a0]/g, NON_BREAKING_SPACE);
  return `${digits}${NON_BREAKING_SPACE}FCFA`;
}

/** 4.8 → "4,8" */
export function formatRating(rating) {
  return rating.toFixed(1).replace(".", ",");
}
