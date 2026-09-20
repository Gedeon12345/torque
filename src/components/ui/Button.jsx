const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "border-line-strong text-ink hover:border-ink",
};

/** `as` permet de rendre un <Link> avec le style d'un bouton. */
export default function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const buttonProps = Component === "button" ? { type: "button" } : {};

  return (
    <Component
      className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-transparent px-[22px] text-[15px] font-semibold transition-[transform,background-color,border-color] duration-200 active:scale-[0.97] ${variants[variant]} ${className}`}
      {...buttonProps}
      {...props}
    />
  );
}
