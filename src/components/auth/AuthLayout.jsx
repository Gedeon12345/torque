import Container from "@/components/common/Container";

export default function AuthLayout({ title, description, children }) {
  return (
    <Container className="flex min-h-[80vh] items-center justify-center pt-24 lg:pt-28">
      <div className="w-full max-w-[420px] rounded-[20px] border border-line bg-surface p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold leading-none">{title}</h1>
        {description && <p className="mt-2.5 text-ink-2">{description}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </Container>
  );
}
