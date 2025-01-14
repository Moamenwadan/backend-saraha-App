import { Router } from "express";
import * as userService from "./user.service.js";
import isAuthenticated from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
const router = Router();

router.get(
  "/profile",
  isAuthenticated,
  isAuthorized(roles.user),
  userService.profile
);

export default router;
