import { Router } from "express";
import * as userService from "./user.service.js";
import isAuthenticated from "../../middleware/auth.middleware.js";
const router = Router();

router.get("/profile", isAuthenticated, userService.profile);

export default router;
