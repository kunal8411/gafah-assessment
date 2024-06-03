import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();
router.post("/login", login);

// Route to create a user
router.post("/register", register);

export default router;
