import { ChevronDown } from "lucide-react";

/** `options` : liste de textes ou d'objets { value, label }. `placeholder={null}` supprime l'option vide. */
export default function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "Choisir",
}) {
  const items = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-[10px] border border-line-strong bg-bg pl-3.5 pr-10 text-ink transition-colors hover:enabled:border-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {placeholder !== null && <option value="">{placeholder}</option>}
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-2"
        />
      </div>
    </div>
  );
}
