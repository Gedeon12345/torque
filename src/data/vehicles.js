export const vehicleCatalog = {
  Toyota: ["Corolla", "Yaris", "RAV4", "Hilux"],
  BMW: ["Série 3", "Série 5", "X5"],
  "Mercedes-Benz": ["Classe C", "Classe E", "GLC"],
  Peugeot: ["206", "307", "508"],
  Hyundai: ["i10", "Elantra", "Tucson"],
  Kia: ["Picanto", "Rio", "Sportage"],
  Nissan: ["Micra", "Qashqai", "Navara"],
  Ford: ["Fiesta", "Focus", "Ranger"],
  Volkswagen: ["Polo", "Golf", "Tiguan"],
};

const LATEST_YEAR = 2025;
export const vehicleYears = Array.from({ length: 21 }, (_, index) => String(LATEST_YEAR - index));

export const vehicleEngines = [
  "Essence 1.2",
  "Essence 1.6",
  "Essence 2.0",
  "Diesel 1.5",
  "Diesel 2.0",
  "Hybride",
];
