import joi from "joi";
import { genders, roles } from "../../DB/models/user.model.js";

export const registerSchema = joi
  .object({
    userName: joi.string().min(3).max(10),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPasswrod: joi.string().valid(joi.ref("password")),
    phone: joi.string().required(),
    role: joi.string().valid(...Object.values(roles)),
    age: joi.string(),
    gender: joi.string().valid(...Object.values(genders)),
    isActivated: joi.boolean(),
    changePasswordTime: joi.boolean(),
    deleted: joi.boolean(),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
