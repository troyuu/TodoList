import Todo from "../models/Todo.js";

const MAX_TITLE = 255;
const ALLOWED_STATUS = new Set(["pending", "completed"]);

function parseDueDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { error: "Due date must be a valid date." };
  return d;
}

function validateTodoInput({ title, status, dueDate }, { partial = false } = {}) {
  const errors = {};

  // title (required unless partial)
  if (!partial || title !== undefined) {
    const t = (title ?? "").toString().trim();
    if (!t) errors.title = "Title is required.";
    else if (t.length > MAX_TITLE) errors.title = `Title must be at most ${MAX_TITLE} characters.`;
  }

  // status (optional on create; default handled by schema)
  if (status !== undefined) {
    if (!ALLOWED_STATUS.has(status)) errors.status = "Status must be 'pending' or 'completed'.";
  }

  // dueDate
  if (dueDate !== undefined) {
    const parsed = parseDueDate(dueDate);
    if (parsed && parsed.error) errors.dueDate = parsed.error;
  }

  return Object.keys(errors).length ? errors : null;
}

// GET /api/todos
export async function listTodos(req, res) {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ todos });
}

// POST /api/todos
export async function createTodo(req, res) {
  const { title, description = "", status, dueDate } = req.body;

  const errors = validateTodoInput({ title, status, dueDate }, { partial: false });
  if (errors) return res.status(400).json({ message: "Validation error", errors });

  const parsedDue = parseDueDate(dueDate);
  if (parsedDue && parsedDue.error) {
    return res.status(400).json({ message: "Validation error", errors: { dueDate: parsedDue.error } });
  }

  const todo = await Todo.create({
    user: req.user._id,
    title: title.trim(),
    description: (description ?? "").toString().trim(),
    status: status ?? "pending",
    dueDate: parsedDue || null,
  });

  res.status(201).json({ todo });
}

// PATCH /api/todos/:id
export async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  const errors = validateTodoInput({ title, status, dueDate }, { partial: true });
  if (errors) return res.status(400).json({ message: "Validation error", errors });

  const parsedDue = dueDate !== undefined ? parseDueDate(dueDate) : undefined;
  if (parsedDue && parsedDue.error) {
    return res.status(400).json({ message: "Validation error", errors: { dueDate: parsedDue.error } });
  }

  const update = {};
  if (title !== undefined) update.title = title.toString().trim();
  if (description !== undefined) update.description = description ? description.toString().trim() : "";
  if (status !== undefined) update.status = status;
  if (dueDate !== undefined) update.dueDate = parsedDue || null;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user._id }, // ✅ user-scoped
    update,
    { new: true }
  );

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json({ todo });
}

// DELETE /api/todos/:id
export async function deleteTodo(req, res) {
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id }); // ✅ user-scoped

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Deleted" });
}
