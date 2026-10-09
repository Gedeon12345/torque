import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Container from "@/components/common/Container";
import ErrorState from "@/components/common/ErrorState";
import PageHeading from "@/components/common/PageHeading";
import AdminNav from "@/components/admin/AdminNav";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useAdminList, useAdminMutation } from "@/hooks/useAdminResource";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { api } from "@/utils/apiClient";
import { formatPrice } from "@/utils/format";

const statusLabel = { active: "Actifs", archived: "Archivés", all: "Tous" };

export default function AdminProductsPage() {
  useDocumentTitle("Produits — Administration");
  const [status, setStatus] = useState("active");
  const [version, setVersion] = useState(0);
  const { items: products, isLoading, error } = useAdminList("/admin/products", { status, limit: 100, _v: version });
  const { run, isSubmitting } = useAdminMutation();

  const toggleActive = (product) =>
    run(() => api.patch(`/admin/products/${product.id}`, { isActive: !product.isActive })).then(() => setVersion((v) => v + 1));

  return (
    <Container className="pt-24 lg:pt-32">
      <PageHeading title="Produits">
        <Button as={Link} to="/admin/products/new" size="compact" className="mt-3">
          <Plus size={18} aria-hidden="true" /> Nouveau produit
        </Button>
      </PageHeading>
      <AdminNav />
      <div className="mb-5 w-full sm:w-56">
        <SelectField id="admin-product-status" label="Statut" value={status} onChange={setStatus} placeholder={null}
          options={Object.entries(statusLabel).map(([value, label]) => ({ value, label }))} />
      </div>

      {isLoading ? <div className="flex justify-center py-16"><Spinner /></div> : error ? <ErrorState message={error.message} /> : (
        <div className="overflow-x-auto rounded-[16px] border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line bg-tile/50 text-ink-2">
              <tr>
                <th className="px-4 py-3 font-semibold">Produit</th>
                <th className="px-4 py-3 font-semibold">Prix</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((product) => (
                <tr key={product.id} className={!product.isActive ? "opacity-60" : ""}>
                  <td className="px-4 py-3">
                    <Link to={`/admin/products/${product.id}`} className="font-semibold hover:text-accent">{product.name}</Link>
                    <p className="text-ink-2">{product.reference} · {product.brand}</p>
                  </td>
                  <td className="px-4 py-3">{formatPrice(product.priceCents)}</td>
                  <td className="px-4 py-3">{product.stockQuantity}</td>
                  <td className="px-4 py-3">{product.isActive ? "Actif" : "Archivé"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/admin/products/${product.id}`} className="font-semibold text-ink hover:text-accent">Modifier</Link>
                      <button type="button" disabled={isSubmitting} onClick={() => toggleActive(product)} className="font-semibold text-accent hover:underline disabled:opacity-50">
                        {product.isActive ? "Archiver" : "Réactiver"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
