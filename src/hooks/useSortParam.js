import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_SORT, sortOptions } from "@/utils/catalog";

/** Tri conservé dans l'URL (?sort=price-asc) : la page reste partageable. */
export function useSortParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("sort");
  const sort = sortOptions.some((option) => option.value === requested) ? requested : DEFAULT_SORT;

  const setSort = useCallback(
    (value) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          if (value === DEFAULT_SORT) next.delete("sort");
          else next.set("sort", value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return [sort, setSort];
}
