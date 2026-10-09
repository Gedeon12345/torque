import AppRoutes from "@/routes/AppRoutes";
import ScrollManager from "@/components/common/ScrollManager";
import { AuthProvider } from "@/store/AuthProvider";
import { ShopProvider } from "@/store/ShopProvider";

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <ScrollManager />
        <AppRoutes />
      </ShopProvider>
    </AuthProvider>
  );
}
