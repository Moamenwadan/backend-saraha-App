import { Router } from "express";
import * as authService from "./auth.service.js";
import validation from "../../middleware/validation.middleware.js";
import * as authSchema from "./auth.validation.js";
const router = Router();
router.post(
  "/register",
  validation(authSchema.registerSchema),
  authService.register
);
router.post("/login", validation(authSchema.loginSchema), authService.login);
router.get("/activate_acount/:token", authService.activateAccount);

export default router;
