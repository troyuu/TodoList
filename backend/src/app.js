import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import healthRoutes from "./routes/health.routes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true, // important for cookies (JWT httpOnly)
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Root route (added — safe, optional, no side effects)
app.get("/", (req, res) => {
  res.send("API running");
});

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

export default app;
