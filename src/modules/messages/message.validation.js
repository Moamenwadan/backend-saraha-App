import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
export const sendMessage = joi.object({
  content: joi.string().required(),
  receiver: joi.custom(isValidObjectId).required(),
});
export const getSingleMessage = joi.object({
  id: joi.custom(isValidObjectId).required(),
});
export const getAllMessages = joi.object({
  flag: joi.string().valid("inbox", "outbox").required(),
});

export const editMessage = joi.object({
  id: joi.custom(isValidObjectId).required(),
  content: joi.string().required(),
});

export const deleteMessage = joi.object({
  id: joi.custom(isValidObjectId).required(),
  content: joi.string().required(),
});
