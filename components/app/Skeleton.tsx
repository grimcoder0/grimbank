// Loading placeholder. Decorative, so it's hidden from assistive tech;
// the page-level loading state carries the accessible "Loading" text.
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-cream-line ${className}`} />;
}
