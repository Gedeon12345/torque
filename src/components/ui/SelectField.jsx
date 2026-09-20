import { ChevronDown } from "lucide-react";

export default function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "Choisir",
}) {
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
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
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
