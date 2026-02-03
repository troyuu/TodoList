import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js"; // ✅ added

async function start() {
  try {
    await connectDB(); // ✅ added
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
