export default function TextField({ id, label, error, className = "", ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink-2">{label}</label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-12 w-full rounded-[10px] border bg-bg px-3.5 text-ink outline-none transition-colors placeholder:text-ink-2 ${error ? "border-danger" : "border-line-strong focus:border-ink"}`}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-1.5 text-[13px] text-danger">{error}</p>}
    </div>
  );
}
