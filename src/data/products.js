import brakeDisc from "@/assets/products/brake-disc.svg";
import brakePads from "@/assets/products/brake-pads.svg";
import carBattery from "@/assets/products/car-battery.svg";
import ledHeadlight from "@/assets/products/led-headlight.svg";
import oilFilter from "@/assets/products/oil-filter.svg";
import shockAbsorber from "@/assets/products/shock-absorber.svg";

export const stockLabels = {
  "in-stock": "En stock",
  "low-stock": "Stock limité",
};

// Produits fictifs : images, prix et avis sont des données de démonstration.
export const products = [
  {
    id: 1,
    name: "Plaquettes de frein avant",
    brand: "Toyota",
    category: "freinage",
    image: brakePads,
    imageAlt: "Jeu de plaquettes de frein avant",
    price: 35000,
    rating: 4.8,
    reviewCount: 126,
    stock: "in-stock",
    badge: "Nouveau",
    compatibility: ["Corolla", "Yaris", "RAV4"],
  },
  {
    id: 2,
    name: "Filtre à huile",
    brand: "Mann-Filter",
    category: "filtration",
    image: oilFilter,
    imageAlt: "Filtre à huile moteur",
    price: 12500,
    rating: 4.7,
    reviewCount: 214,
    stock: "in-stock",
    compatibility: ["Toyota", "Hyundai", "Kia"],
  },
  {
    id: 3,
    name: "Phare LED universel",
    brand: "Osram",
    category: "eclairage",
    image: ledHeadlight,
    imageAlt: "Phare LED avec bandeau lumineux",
    price: 45000,
    oldPrice: 58000,
    rating: 4.5,
    reviewCount: 58,
    stock: "low-stock",
    badge: "Promo",
    compatibility: ["Universel, 12 V"],
  },
  {
    id: 4,
    name: "Disque de frein ventilé",
    brand: "Brembo",
    category: "freinage",
    image: brakeDisc,
    imageAlt: "Disque de frein ventilé avec étrier rouge",
    price: 28000,
    rating: 4.9,
    reviewCount: 91,
    stock: "in-stock",
    compatibility: ["Peugeot 307", "308", "508"],
  },
  {
    id: 5,
    name: "Amortisseur avant",
    brand: "Monroe",
    category: "suspension",
    image: shockAbsorber,
    imageAlt: "Amortisseur avec ressort",
    price: 52000,
    rating: 4.6,
    reviewCount: 73,
    stock: "low-stock",
    compatibility: ["Hyundai i10", "Kia Picanto"],
  },
  {
    id: 6,
    name: "Batterie 12 V 60 Ah",
    brand: "Bosch",
    category: "electricite",
    image: carBattery,
    imageAlt: "Batterie de voiture 12 volts",
    price: 68000,
    oldPrice: 75000,
    rating: 4.7,
    reviewCount: 167,
    stock: "in-stock",
    badge: "Promo",
    compatibility: ["Berlines et SUV compacts"],
  },
];
