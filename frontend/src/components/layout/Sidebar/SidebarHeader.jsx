export function SidebarHeader() {
  return (
    <div className="px-4 py-4 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-white/10 grid place-items-center font-semibold">
          ✓
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight">ToDo</p>
          <p className="text-xs text-white/60 truncate">
            Keep it simple.
          </p>
        </div>
      </div>
    </div>
  );
}
