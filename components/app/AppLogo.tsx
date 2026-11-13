export function AppLogo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const bar = tone === "light" ? "bg-white" : "bg-navy";
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-end gap-[3px]" aria-hidden="true">
        <span className={`h-[52%] w-[30%] rounded-sm opacity-50 ${bar}`} />
        <span className={`h-[78%] w-[30%] rounded-sm opacity-75 ${bar}`} />
        <span className="h-full w-[30%] rounded-sm bg-accent" />
      </div>
      <span className={`text-lg font-bold tracking-tight ${tone === "light" ? "text-white" : "text-navy"}`}>
        GrimBank
      </span>
    </div>
  );
}
