const NAV = [
  { key: "inbox", label: "Inbox" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

export function SidebarNav({ activeKey, onChange }) {
  return (
    <nav className="px-2 py-3" aria-label="Sidebar navigation">
      <ul className="space-y-1">
        {NAV.map((item) => {
          const active = item.key === activeKey;

          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onChange(item.key)}
                aria-current={active ? "page" : undefined}
                className={[
                  "w-full flex items-center px-3 py-2 rounded-md text-sm",
                  "transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                ].join(" ")}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
