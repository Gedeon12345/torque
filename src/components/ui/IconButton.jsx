/**
 * Bouton d'icône 44 px (cible tactile confortable).
 * `as` permet de rendre un <Link> ou un <a> à la place d'un <button>.
 */
export default function IconButton({
  as: Component = "button",
  label,
  className = "",
  children,
  ...props
}) {
  const buttonProps = Component === "button" ? { type: "button" } : {};

  return (
    <Component
      aria-label={label}
      className={`relative flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/8 ${className}`}
      {...buttonProps}
      {...props}
    >
      {children}
    </Component>
  );
}
