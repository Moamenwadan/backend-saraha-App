import User from "../../DB/models/user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import Crypto from "crypto-js";
import jwt from "jsonwebtoken";
import asyncHandler from "../../utils/errorHandling/asyncHandler.js";
import { hash, compareHashing } from "../../utils/hashing/hash.js";
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
  // const hashPassword = bcrypt.hashSync(
  //   password,
  //   Number(process.env.SALT_ROUND)
  // );
  const hashPassword = hash({ plainText: password });
  const encryptionPhone = Crypto.AES.encrypt(phone, process.env.ENCRYPTION);
  user.password = hashPassword;
  user.phone = encryptionPhone;
  await user.save();
  // await user.save();
  return res.status(201).json({
    status: "success",
    message: "the user created successfully",
    user,
  });
});
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select(
    "_id userName email phone password"
  );
  if (!user) return next(new Error("the user doesn't exist", { cause: 404 }));
  // if (!bcrypt.compareSync(password, user.password))
  if (
    !compareHashing({
      plainText: password,
      passwordFromDatabase: user.password,
    })
  )
    return next(new Error("invalid password", { cause: 401 }));
  const dcryptionPhone = Crypto.AES.decrypt(
    user.phone,
    process.env.ENCRYPTION
  ).toString(Crypto.enc.Utf8);
  user.phone = dcryptionPhone;
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SIGNATURE,
    { expiresIn: "3h" }
  );

  return res.status(201).json({
    status: "success",
    message: "successfully login",
    token,
  });
};
