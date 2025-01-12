import { Router } from "express";
import * as authService from "./auth.service.js";
const router = Router();
router.post("/register", authService.register);
router.post("/login", authService.login);
router.get("/activate_acount/:token", authService.activateAccount);

export default router;
