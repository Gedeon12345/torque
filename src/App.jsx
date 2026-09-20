import AppRoutes from "@/routes/AppRoutes";
import ScrollManager from "@/components/common/ScrollManager";
import { ShopProvider } from "@/store/ShopProvider";

export default function App() {
  return (
    <ShopProvider>
      <ScrollManager />
      <AppRoutes />
    </ShopProvider>
  );
}
