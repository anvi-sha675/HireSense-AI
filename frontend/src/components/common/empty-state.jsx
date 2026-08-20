import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[rgb(var(--border))] px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--surface-2))] text-[rgb(var(--fg-muted))]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-[rgb(var(--fg-muted))]">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
