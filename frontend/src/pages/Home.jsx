import { useEffect, useMemo, useState } from "react";
import AddTodo from "../components/todos/AddTodo";
import TodoCards from "../components/todos/TodoCards";
import EditTodoModal from "../components/todos/EditTodoModal";
import { todosApi } from "../api/todos";

export default function Home({ activeKey }) {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Load todos once
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        setLoading(true);
        const data = await todosApi.list(); // ✅ GET /api/todos
        if (!alive) return;
        setTodos(data.todos || []);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Failed to load todos.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const filteredTodos = useMemo(() => {
    if (activeKey === "completed") return todos.filter((t) => t.status === "completed");
    return todos;
  }, [activeKey, todos]);

  async function handleAdd(payload) {
    // payload comes from AddTodo: { title, description, status, dueDate }
    try {
      setError("");
      const data = await todosApi.create(payload); // ✅ POST /api/todos
      setTodos((prev) => [data.todo, ...prev]); // ✅ keep newest first (matches backend sort)
    } catch (e) {
      setError(e.data?.message || e.message || "Failed to add todo.");
    }
  }

  async function handleToggle(id) {
    const current = todos.find((t) => t._id === id || t.id === id);
    if (!current) return;

    const nextStatus = current.status === "completed" ? "pending" : "completed";

    try {
      setError("");
      const realId = current._id || current.id; // ✅ mongoose uses _id
      const data = await todosApi.update(realId, { status: nextStatus }); // ✅ PATCH
      setTodos((prev) => prev.map((t) => ((t._id || t.id) === realId ? data.todo : t)));
    } catch (e) {
      setError(e.data?.message || e.message || "Failed to update todo.");
    }
  }

  async function handleDelete(id) {
    const realId = id;
    try {
      setError("");
      await todosApi.remove(realId); // ✅ DELETE
      setTodos((prev) => prev.filter((t) => (t._id || t.id) !== realId));
    } catch (e) {
      setError(e.data?.message || e.message || "Failed to delete todo.");
    }
  }

  function handleEdit(todo) {
    setEditing(todo);
  }

  async function handleSave(updated) {
    try {
      setError("");
      const realId = updated._id || updated.id;
      const data = await todosApi.update(realId, {
        title: updated.title,
        description: updated.description,
        dueDate: updated.dueDate,
        status: updated.status,
      });
      setTodos((prev) => prev.map((t) => ((t._id || t.id) === realId ? data.todo : t)));
      setEditing(null);
    } catch (e) {
      setError(e.data?.message || e.message || "Failed to save todo.");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold capitalize">{activeKey}</h1>
        <p className="text-sm text-white/60">
          {filteredTodos.length} task{filteredTodos.length === 1 ? "" : "s"}
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <AddTodo onAdd={handleAdd} />

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/70">Loading todos…</p>
        </div>
      ) : (
        <TodoCards
          todos={filteredTodos}
          onToggle={(id) => handleToggle(id)}
          onDelete={(id) => handleDelete(id)}
          onEdit={handleEdit}
        />
      )}

      <EditTodoModal
        open={!!editing}
        todo={editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
}
