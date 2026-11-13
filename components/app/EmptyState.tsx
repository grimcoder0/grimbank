import Link from "next/link";

type EmptyStateProps = {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({ title, message, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-cream-line bg-cream-field p-8 text-center">
      <p className="text-base font-semibold text-navy">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-secondary">{message}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="mt-4 inline-flex text-sm font-semibold text-navy underline">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
