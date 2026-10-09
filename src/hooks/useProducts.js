import { useApiResource } from "@/hooks/useApiResource";
import { apiList } from "@/utils/apiClient";

/** params : { q, category, brand, sort, page, limit } — toutes facultatives. */
export function useProducts(params = {}) {
  const key = JSON.stringify(params);
  const { data, isLoading, error } = useApiResource(
    (signal) => apiList("/products", params, signal),
    [key],
  );
  return { products: data?.items ?? [], meta: data?.meta, isLoading, error };
}
