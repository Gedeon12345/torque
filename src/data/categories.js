import { ArrowDownUp, CircleDot, Cog, Disc3, Lightbulb, Snowflake, Wind, Zap } from "lucide-react";

export const categories = [
  { slug: "freinage", name: "Freinage", description: "Plaquettes, disques, étriers", icon: Disc3 },
  { slug: "moteur", name: "Moteur", description: "Courroies, joints, bougies", icon: Cog },
  { slug: "suspension", name: "Suspension", description: "Amortisseurs, ressorts, rotules", icon: ArrowDownUp },
  { slug: "electricite", name: "Électricité", description: "Batteries, alternateurs", icon: Zap },
  { slug: "eclairage", name: "Éclairage", description: "Phares, feux, ampoules", icon: Lightbulb },
  { slug: "climatisation", name: "Climatisation", description: "Compresseurs, filtres", icon: Snowflake },
  { slug: "filtration", name: "Filtration", description: "Huile, air, carburant", icon: Wind },
  { slug: "pneumatiques", name: "Pneumatiques", description: "Pneus, jantes, valves", icon: CircleDot },
];
