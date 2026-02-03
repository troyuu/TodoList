import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { createTodo, deleteTodo, listTodos, updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.use(requireAuth); // ✅ protect all todo routes

router.get("/", listTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
