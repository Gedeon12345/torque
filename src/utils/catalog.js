import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const sortOptions = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];
export const DEFAULT_SORT = "relevance";

const sorters = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
};

export function sortProducts(list, sortKey) {
  const compare = sorters[sortKey];
  return compare ? [...list].sort(compare) : list;
}

export const getProductById = (id) => products.find((product) => product.id === Number(id));
export const getCategoryBySlug = (slug) => categories.find((category) => category.slug === slug);
export const getProductsByCategory = (slug) => products.filter((product) => product.category === slug);

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}

export function getDiscountPercent({ price, oldPrice }) {
  return oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
}

const normalize = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Recherche : tous les mots saisis doivent se retrouver dans la fiche ; `brand` filtre par marque de véhicule. */
export function searchProducts({ query = "", brand = "" }) {
  const words = normalize(query).split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    if (brand && product.brand !== brand && !product.compatibleBrands.some((b) => b === brand || b === "*")) {
      return false;
    }
    const categoryName = getCategoryBySlug(product.category)?.name ?? "";
    const haystack = normalize(
      [product.name, product.brand, categoryName, product.reference, product.compatibility.join(" ")].join(" "),
    );
    return words.every((word) => haystack.includes(word));
  });
}
