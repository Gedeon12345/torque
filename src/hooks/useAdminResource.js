import { useCallback, useState } from "react";
import { useApiResource } from "@/hooks/useApiResource";
import { api, apiList } from "@/utils/apiClient";

export function useAdminList(path, params = {}) {
  const key = JSON.stringify(params);
  const { data, isLoading, error } = useApiResource((signal) => apiList(path, params, signal), [path, key]);
  return { items: data?.items ?? [], meta: data?.meta, isLoading, error };
}

export function useAdminStats() {
  const { data, isLoading, error } = useApiResource((signal) => api.get("/admin/stats", undefined, signal), []);
  return { stats: data, isLoading, error };
}

export function useAdminMutation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const run = useCallback(async (fn) => {
    setIsSubmitting(true);
    try {
      return await fn();
    } finally {
      setIsSubmitting(false);
    }
  }, []);
  return { run, isSubmitting };
}
