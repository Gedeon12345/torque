export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-dashed border-line-strong px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-tile text-ink-2">
        <Icon size={26} aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-none">{title}</h2>
      {description && <p className="mt-3 max-w-[44ch] text-ink-2">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
