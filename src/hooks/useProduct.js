import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/utils/apiClient";

export function useProduct(idOrSlug) {
  const { data, isLoading, error } = useApiResource(
    (signal) => api.get(`/products/${idOrSlug}`, undefined, signal),
    [idOrSlug],
  );
  return { product: data, isLoading, error };
}

export function useRelatedProducts(idOrSlug) {
  const { data, isLoading } = useApiResource(
    (signal) => (idOrSlug ? api.get(`/products/${idOrSlug}/related`, undefined, signal) : Promise.resolve([])),
    [idOrSlug],
  );
  return { relatedProducts: data ?? [], isLoading };
}
