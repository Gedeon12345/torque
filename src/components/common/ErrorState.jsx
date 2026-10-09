import { TriangleAlert } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-dashed border-line-strong px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-danger">
        <TriangleAlert size={26} aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold leading-none">Impossible de charger ces données</h2>
      <p className="mt-3 max-w-[44ch] text-ink-2">{message ?? "Une erreur est survenue. Réessayez dans un instant."}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-6 font-semibold text-accent hover:underline">Réessayer</button>
      )}
    </div>
  );
}
