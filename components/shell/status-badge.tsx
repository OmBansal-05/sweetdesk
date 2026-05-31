const statusStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "low stock": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "out of stock": "bg-rose-50 text-rose-700 ring-rose-600/20",
  pending: "bg-slate-100 text-slate-700 ring-slate-600/20",
  "in progress": "bg-blue-50 text-blue-700 ring-blue-600/20",
  ready: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  completed: "bg-slate-100 text-slate-600 ring-slate-600/20",
  cancelled: "bg-rose-50 text-rose-600 ring-rose-600/20",
};

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] ?? "bg-slate-100 text-slate-700 ring-slate-600/20";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${style}`}
    >
      {status}
    </span>
  );
}
