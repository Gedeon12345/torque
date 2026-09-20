export default function Container({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component className={`mx-auto w-full max-w-[1200px] px-5 lg:px-8 ${className}`} {...props}>
      {children}
    </Component>
  );
}
