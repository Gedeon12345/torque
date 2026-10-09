import { useNavigate, useParams } from "react-router-dom";
import Container from "@/components/common/Container";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import AdminNav from "@/components/admin/AdminNav";
import ProductForm from "@/components/admin/ProductForm";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useApiResource } from "@/hooks/useApiResource";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { api } from "@/utils/apiClient";

export default function AdminProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useApiResource((signal) => api.get(`/admin/products/${id}`, undefined, signal), [id]);
  useDocumentTitle(product ? `Modifier ${product.name}` : "Modifier un produit");

  const handleSubmit = async (payload) => {
    await api.patch(`/admin/products/${id}`, payload);
    navigate("/admin/products");
  };

  const handleArchiveToggle = async () => {
    await api.patch(`/admin/products/${id}`, { isActive: !product.isActive });
    navigate("/admin/products");
  };

  if (isLoading) return <Container className="pt-24 lg:pt-32"><div className="flex justify-center py-16"><Spinner /></div></Container>;
  if (error || !product) return <Container className="pt-24 lg:pt-32"><ErrorState message={error?.message} /></Container>;

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title={`Modifier : ${product.name}`}>
        <Button variant="ghost" size="compact" onClick={handleArchiveToggle} className="mt-3">
          {product.isActive ? "Archiver ce produit" : "Réactiver ce produit"}
        </Button>
      </PageHeading>
      <AdminNav />
      <ProductForm key={product.id} product={product} onSubmit={handleSubmit} submitLabel="Enregistrer les modifications" />
    </Container>
  );
}
