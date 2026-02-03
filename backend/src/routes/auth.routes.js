import { Router } from "express";
import { login, logout, register, me } from "../controllers/auth.controller.js"; // ✅ add me
import { requireAuth } from "../middlewares/requireAuth.js"; // ✅ add

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", requireAuth, me); // ✅ add

export default router;
