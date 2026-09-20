export default function SectionHeading({ id, title, description, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
      <div>
        <h2 id={id} className="font-display text-[length:clamp(32px,6vw,48px)] font-bold leading-[1.02]">
          {title}
        </h2>
        {description && <p className="mt-2.5 max-w-[52ch] text-ink-2">{description}</p>}
      </div>
      {action}
    </div>
  );
}
