import { Router } from "express";
import * as messageService from "./message.service.js";
import validation from "../../middleware/validation.middleware.js";
import {
  sendMessage,
  getSingleMessage,
  getAllMessages,
  editMessage,
  deleteMessage,
} from "./message.validation.js";
import isAuthenticated from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
const router = Router();
// create message
router.post(
  "/",
  validation(sendMessage),
  isAuthenticated,
  isAuthorized(roles.user, roles.admin),
  messageService.sendMessage
);
// get single message
router.get(
  "/:id",
  validation(getSingleMessage),
  isAuthenticated,
  isAuthorized(roles.user, roles.admin),
  messageService.getSingleMessage
);
router.get(
  "/",
  validation(getAllMessages),
  isAuthenticated,
  isAuthorized(roles.user, roles.admin),
  messageService.getAllMessages
);
router.patch(
  "/:id",
  validation(editMessage),
  isAuthenticated,
  isAuthorized(roles.user, roles.admin),
  messageService.editMessage
);
router.delete(
  "/:id",
  validation(deleteMessage),
  isAuthenticated,
  isAuthorized(roles.user, roles.admin),
  messageService.deleteMessage
);

export default router;
