import { Skeleton } from "@/components/app/Skeleton";

export default function AppLoading() {
  return (
    <div aria-busy="true" className="max-w-4xl space-y-6">
      <span className="sr-only">Loading</span>
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
