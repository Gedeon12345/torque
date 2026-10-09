import { useNavigate } from "react-router-dom";
import Container from "@/components/common/Container";
import PageHeading from "@/components/common/PageHeading";
import AdminNav from "@/components/admin/AdminNav";
import ProductForm from "@/components/admin/ProductForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { api } from "@/utils/apiClient";

export default function AdminProductCreatePage() {
  useDocumentTitle("Nouveau produit — Administration");
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    const product = await api.post("/admin/products", payload);
    navigate(`/admin/products/${product.id}`);
  };

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Nouveau produit" />
      <AdminNav />
      <ProductForm onSubmit={handleSubmit} submitLabel="Créer le produit" />
    </Container>
  );
}
