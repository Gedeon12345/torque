import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PlaceholderPage from "@/pages/PlaceholderPage";

const secondaryPages = [
  { path: "products", title: "Toutes les pièces" },
  { path: "products/:id", title: "Fiche produit" },
  { path: "categories/:slug", title: "Catégorie" },
  { path: "search", title: "Recherche" },
  { path: "cart", title: "Panier" },
  { path: "favorites", title: "Favoris" },
  { path: "about", title: "À propos" },
  { path: "contact", title: "Contact" },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {secondaryPages.map(({ path, title }) => (
          <Route key={path} path={path} element={<PlaceholderPage title={title} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
