import { Minus, Plus } from "lucide-react";

const stepButtonClass =
  "flex size-11 items-center justify-center transition-colors hover:enabled:bg-ink/8 disabled:opacity-40";

export default function QuantityStepper({ value, onChange, min = 1, max = 10, label = "Quantité" }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-[10px] border border-line-strong bg-surface"
    >
      <button
        type="button"
        aria-label="Diminuer la quantité"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`${stepButtonClass} rounded-l-[9px]`}
      >
        <Minus size={18} aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-9 text-center font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={`${stepButtonClass} rounded-r-[9px]`}
      >
        <Plus size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
