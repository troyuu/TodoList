import { useEffect, useMemo, useState } from "react";

const MAX_TITLE = 255;

export default function EditTodoModal({ open, todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [dueDate, setDueDate] = useState(todo?.dueDate ? todo.dueDate : "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(todo?.title || "");
    setDescription(todo?.description || "");
    setDueDate(todo?.dueDate ? todo.dueDate : "");
    setTouched(false);
  }, [open, todo]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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

    onSave({
      ...todo,
      title: cleanTitle,
      description: cleanDescription || "",
      dueDate: dueDate || null,
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close edit modal" onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto mt-24 w-[92%] max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold">Edit task</h3>
            <p className="text-sm text-white/60">Update your todo details.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="edit-title" className="block text-xs text-white/60 mb-1">
              Title
            </label>
            <input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched(true)}
              maxLength={MAX_TITLE}
              className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                         text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            />
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-red-300">{titleError}</p>
              <p className="text-xs text-white/40">
                {title.trim().length}/{MAX_TITLE}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="edit-desc" className="block text-xs text-white/60 mb-1">
              Description (optional)
            </label>
            <textarea
              id="edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                         text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            />
          </div>

          <div>
            <label htmlFor="edit-due" className="block text-xs text-white/60 mb-1">
              Due date (optional)
            </label>
            <input
              id="edit-due"
              type="date"
              value={dueDate || ""}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                         text-sm text-white/80
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm
                         hover:bg-white/10 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-white text-zinc-950 px-3 py-2 text-sm font-medium
                         hover:bg-white/90 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
