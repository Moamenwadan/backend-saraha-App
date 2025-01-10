import User from "../../DB/models/user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import Crypto from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { userName, age, password, confirmPasswrod, isActivated, phone } =
      req.body;

    const user = await User.create({ ...req.body });
    if (password != confirmPasswrod)
      return next(new Error("confirmPassword must be match password"));
    const hashPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUND)
    );
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
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "_id userName email phone password"
    );
    if (!user) return next(new Error("the user doesn't exist"));
    if (!bcrypt.compareSync(password, user.password))
      return next(new Error("invalid password"));
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
  } catch (error) {
    next(error);
  }
};
