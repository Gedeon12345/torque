import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/utils/apiClient";

export function useCategories() {
  const { data, isLoading, error } = useApiResource((signal) => api.get("/categories", undefined, signal), []);
  return { categories: data ?? [], isLoading, error };
}

export function useCategory(slug) {
  const { data, isLoading, error } = useApiResource(
    (signal) => api.get(`/categories/${slug}`, undefined, signal),
    [slug],
  );
  return { category: data, isLoading, error };
}
