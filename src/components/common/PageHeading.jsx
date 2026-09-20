export default function PageHeading({ title, description, children }) {
  return (
    <header className="mb-6 lg:mb-8">
      <h1 className="font-display text-[length:clamp(38px,8vw,60px)] font-bold leading-none">{title}</h1>
      {description && <p className="mt-3 max-w-[56ch] text-ink-2">{description}</p>}
      {children}
    </header>
  );
}
