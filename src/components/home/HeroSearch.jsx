import { createSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "@/components/common/SearchBar";

export default function HeroSearch() {
  const navigate = useNavigate();

  const goToSearch = (query) =>
    navigate({ pathname: "/search", search: query ? `?${createSearchParams({ q: query })}` : "" });

  return <SearchBar id="hero-search" buttonLabel="Rechercher une pièce" onSubmit={goToSearch} />;
}
