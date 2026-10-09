export default function Spinner({ className = "" }) {
  return (
    <span
      role="status"
      aria-label="Chargement"
      className={`inline-block size-6 animate-spin rounded-full border-2 border-line-strong border-t-ink ${className}`}
    />
  );
}
