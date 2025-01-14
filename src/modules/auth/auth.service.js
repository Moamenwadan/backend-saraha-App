import User from "../../DB/models/user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import Crypto from "crypto-js";
import jwt from "jsonwebtoken";
import asyncHandler from "../../utils/errorHandling/asyncHandler.js";
import { hash, compareHashing } from "../../utils/hashing/hash.js";
import sendEmail from "../../utils/emails/sendEmail.js";
import { signup } from "../../utils/emails/generateHTML.js";
import event from "../../utils/emails/email.event.js";
import { dcryption, encryption } from "../../utils/encryption/encryption.js";
import { generateToken } from "../../utils/token/token.js";
export const register = asyncHandler(async (req, res, next) => {
  const { userName, email, age, password, confirmPasswrod, phone, gender } =
    req.body;

  if (password != confirmPasswrod)
    return next(new Error("confirmPassword must be match password"));
  const user = await User.create({
    userName,
    email,
    age,
    password,
    phone,
    gender,
  });

  event.emit("send", email);
  const hashPassword = hash({ plainText: password });
  const encryptionPhone = encryption({ plainText: phone });
  user.password = hashPassword;
  user.phone = encryptionPhone;
  await user.save();
  return res.status(201).json({
    status: "success",
    message: "the user created successfully",
    user,
  });
});
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select(
    "_id userName email phone password isActivated"
  );
  if (!user) return next(new Error("the user doesn't exist", { cause: 404 }));
  if (!user.isActivated)
    return next(new Error("you must activate account", { cause: 403 }));
  if (
    !compareHashing({
      plainText: password,
      passwordFromDatabase: user.password,
    })
  )
    return next(new Error("invalid password", { cause: 401 }));

  const dcryptionPhone = dcryption({ plainText: user.phone });
  user.phone = dcryptionPhone;
  const token = generateToken({ plainText: { id: user._id, email: email } });

  return res.status(201).json({
    status: "success",
    message: "successfully login",
    token,
  });
};

export const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  const { email } = jwt.verify(token, process.env.SIGNATURE);
  const user = await User.findOne({ email });
  if (!user) return next(new Error("document not found"), { cause: 400 });
  user.isActivated = true;
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "try to login now your account is activated",
  });
};
