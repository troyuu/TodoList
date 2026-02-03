import { useEffect, useState } from "react";

export default function AppShell({ sidebar, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="md:hidden sticky top-0 z-40 h-14 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="h-full px-4 flex items-center justify-between">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="h-10 w-10 inline-flex items-center justify-center rounded-md
                       border border-white/10 bg-white/5 hover:bg-white/10
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <div className="space-y-1">
              <div className="h-0.5 w-5 bg-white/80" />
              <div className="h-0.5 w-5 bg-white/80" />
              <div className="h-0.5 w-5 bg-white/80" />
            </div>
          </button>

          <span className="text-sm font-semibold">ToDo</span>

          <div className="w-10" />
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block w-72 border-r border-white/10 bg-zinc-950">
          <div className="h-dvh sticky top-0 overflow-y-auto">{sidebar}</div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>

      {open && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60"
          />

          <aside
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs
                       border-r border-white/10 bg-zinc-950"
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
              <span className="text-sm font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="h-10 w-10 inline-flex items-center justify-center rounded-md
                           border border-white/10 bg-white/5 hover:bg-white/10
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto">
              <div onClick={() => setOpen(false)}>{sidebar}</div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
