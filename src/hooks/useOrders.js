import { useCallback, useState } from "react";
import { useApiResource } from "@/hooks/useApiResource";
import { api, apiList } from "@/utils/apiClient";

export function useOrders(params = {}) {
  const key = JSON.stringify(params);
  const { data, isLoading, error } = useApiResource((signal) => apiList("/orders", params, signal), [key]);
  return { orders: data?.items ?? [], meta: data?.meta, isLoading, error };
}

export function useOrder(idOrNumber) {
  const { data, isLoading, error } = useApiResource(
    (signal) => (idOrNumber ? api.get(`/orders/${idOrNumber}`, undefined, signal) : Promise.resolve(null)),
    [idOrNumber],
  );
  return { order: data, isLoading, error };
}

/** Création de commande : pas de useApiResource (déclenché par un clic, pas au chargement). */
export function useCreateOrder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createOrder = useCallback(async (payload) => {
    setIsSubmitting(true);
    try {
      return await api.post("/orders", payload);
    } finally {
      setIsSubmitting(false);
    }
  }, []);
  return { createOrder, isSubmitting };
}
