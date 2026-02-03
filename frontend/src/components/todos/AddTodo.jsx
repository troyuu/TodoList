import { useMemo, useState } from "react";

const MAX_TITLE = 255;

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // YYYY-MM-DD
  const [touched, setTouched] = useState(false);

  const titleError = useMemo(() => {
    if (!touched) return "";
    const t = title.trim();
    if (!t) return "Title is required.";
    if (t.length > MAX_TITLE) return `Title must be at most ${MAX_TITLE} characters.`;
    return "";
  }, [title, touched]);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || titleError) return;

    onAdd({
      title: cleanTitle,
      description: cleanDescription || "",
      status: "pending",
      dueDate: dueDate || null,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setTouched(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Add a task</h2>
        <button
          type="submit"
          className="rounded-md bg-white text-zinc-950 px-3 py-2 text-sm font-medium
                     hover:bg-white/90 transition
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        <div>
          <label htmlFor="todo-title" className="block text-xs text-white/60 mb-1">
            Title
          </label>
          <input
            id="todo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
            maxLength={MAX_TITLE}
            placeholder="e.g. Finish portfolio section"
            className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                       text-sm placeholder-white/40
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-red-300">{titleError}</p>
            <p className="text-xs text-white/40">
              {title.trim().length}/{MAX_TITLE}
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="todo-desc" className="block text-xs text-white/60 mb-1">
            Description (optional)
          </label>
          <textarea
            id="todo-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full resize-none rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                       text-sm placeholder-white/40
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          />
        </div>

        <div>
          <label htmlFor="todo-due" className="block text-xs text-white/60 mb-1">
            Due date (optional)
          </label>
          <input
            id="todo-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                       text-sm text-white/80
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          />
        </div>
      </div>
    </form>
  );
}
