const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "border-line-strong text-ink hover:border-ink",
  success: "bg-success text-white",
};

const sizes = {
  md: "h-12 px-[22px] text-[15px]",
  lg: "h-14 px-[30px] text-base",
  icon: "size-12 text-[15px]",
};

/** `as` permet de rendre un <Link> avec le style d'un bouton. */
export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const buttonProps = Component === "button" ? { type: "button" } : {};

  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-transparent font-semibold transition-[transform,background-color,border-color] duration-200 active:scale-[0.97] ${sizes[size]} ${variants[variant]} ${className}`}
      {...buttonProps}
      {...props}
    />
  );
}
