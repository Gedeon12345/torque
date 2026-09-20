import { useState } from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

/** Barre de recherche : la page décide quoi faire du texte via `onSubmit(query)`. */
export default function SearchBar({ id, initialValue = "", buttonLabel = "Rechercher", onSubmit }) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query.trim());
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-col gap-1.5 rounded-[14px] border border-line bg-surface p-1.5 shadow-[0_14px_34px_-22px_rgba(20,24,32,0.45)] focus-within:border-ink lg:flex-row lg:items-center"
    >
      <label htmlFor={id} className="sr-only">
        Rechercher une pièce, une marque ou une référence
      </label>
      <div className="flex h-[52px] flex-1 items-center gap-2.5 px-3 text-ink-2">
        <Search size={20} aria-hidden="true" className="shrink-0" />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pièce, marque ou référence"
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-2"
        />
      </div>
      <Button type="submit" className="lg:h-[52px]">
        {buttonLabel}
      </Button>
    </form>
  );
}
