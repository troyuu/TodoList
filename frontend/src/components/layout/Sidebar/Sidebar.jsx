import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const NAV = [
  { key: "inbox", label: "Inbox" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5" {...props}>
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function initialsFromEmail(email) {
  if (!email) return "U";
  return (email[0] || "U").toUpperCase();
}

export default function Sidebar({ activeKey, onChange }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="h-dvh flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center font-semibold">
            ✓
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">ToDo</p>
            <p className="text-xs text-white/60 truncate">Organize your day</p>
          </div>
        </div>

        <nav aria-label="Main navigation">
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
                      "w-full text-left px-3 py-2 rounded-md text-sm transition",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/10">
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md
                       text-sm text-white/80 hover:text-white hover:bg-white/5
                       transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <span className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
              <UserIcon />
            </span>
            <span className="truncate">Account</span>
          </button>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md
                         text-sm text-white/80 hover:text-white hover:bg-white/5
                         transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="h-9 w-9 rounded-full bg-white/10 grid place-items-center font-medium">
                  {initialsFromEmail(user?.email)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-white">{user?.name || "User"}</span>
                  <span className="block truncate text-xs text-white/50">{user?.email}</span>
                </span>
              </span>
              <span className="text-white/60">▾</span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute bottom-12 left-0 w-full rounded-xl border border-white/10 bg-zinc-950 shadow-lg overflow-hidden"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
                >
                  Profile
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
