function formatDueDate(dateStr) {
  if (!dateStr) return "";
  return dateStr; // UI-only for now (YYYY-MM-DD)
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 20h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M3 6h18M9 6V4h6v2m-7 4v10m8-10v10M6 6l1 16h10l1-16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TodoCards({ todos, onToggle, onDelete, onEdit }) {
  if (!todos?.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/70">No tasks yet.</p>
        <p className="text-xs text-white/50 mt-1">
          Add your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => {
        const completed = todo.status === "completed";
        const id = todo._id || todo.id; // ✅ single source of truth

        return (
          <article
            key={id} // ✅ FIX: stable, unique key
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3
                  className={
                    completed
                      ? "font-medium text-white/50 line-through"
                      : "font-medium text-white"
                  }
                >
                  {todo.title}
                </h3>

                {todo.description ? (
                  <p
                    className={
                      completed
                        ? "mt-1 text-sm text-white/40"
                        : "mt-1 text-sm text-white/70"
                    }
                  >
                    {todo.description}
                  </p>
                ) : null}

                {todo.dueDate ? (
                  <p className="mt-2 text-xs text-white/50">
                    Due: {formatDueDate(todo.dueDate)}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(id)} // ✅ FIX
                  className={[
                    "h-9 w-9 rounded-md border border-white/10 grid place-items-center transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                    completed
                      ? "bg-white text-zinc-950 hover:bg-white/90"
                      : "bg-zinc-950/40 text-white/70 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  aria-label={
                    completed ? "Mark as pending" : "Mark as completed"
                  }
                >
                  <CheckIcon />
                </button>

                <button
                  type="button"
                  onClick={() => onEdit(todo)}
                  className="h-9 w-9 rounded-md border border-white/10 grid place-items-center transition
                             bg-zinc-950/40 text-white/70 hover:bg-white/10 hover:text-white
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Edit task"
                >
                  <PencilIcon />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(id)} // ✅ FIX
                  className="h-9 w-9 rounded-md border border-white/10 grid place-items-center transition
                             bg-zinc-950/40 text-white/70 hover:bg-white/10 hover:text-white
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Delete task"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
