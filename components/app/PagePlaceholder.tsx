export function PagePlaceholder({ title }: { title: string }) {
  return (
    <section className="max-w-3xl">
      <h1 className="font-display text-4xl tracking-tight text-navy">{title}</h1>
      <p className="mt-3 text-base leading-7 text-ink-secondary">
        This page is part of the app layout only. Its content is added in a later stage.
      </p>
    </section>
  );
}
