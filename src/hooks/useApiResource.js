import { useEffect, useRef, useState } from "react";

/**
 * Appelle `fetcher(signal)` à chaque changement de `deps`, annule l'appel précédent s'il est
 * encore en cours, et expose { data, isLoading, error }. `fetcher` doit renvoyer une promesse.
 */
export function useApiResource(fetcher, deps) {
  const [state, setState] = useState({ data: null, isLoading: true, error: null });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, isLoading: true, error: null }));

    fetcherRef
      .current(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ data, isLoading: false, error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ data: null, isLoading: false, error });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
