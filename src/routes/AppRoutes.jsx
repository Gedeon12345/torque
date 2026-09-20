import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/AboutPage";
import CartPage from "@/pages/CartPage";
import CategoryPage from "@/pages/CategoryPage";
import FavoritesPage from "@/pages/FavoritesPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import SearchPage from "@/pages/SearchPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="categories/:slug" element={<CategoryPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
