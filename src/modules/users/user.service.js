import User from "../../DB/models/user.model.js";
import Crypto from "crypto-js";
import jwt from "jsonwebtoken";
import asyncHandler from "../../utils/errorHandling/asyncHandler.js";

export const profile = asyncHandler(async (req, res, next) => {
  // const { authorization } = req.headers;
  // // console.log(auth);
  // if (!authorization || !authorization.startsWith("Bearear"))
  //   return next(new Error("Invalid Bearear Token", { cause: 403 }));

  // const token = authorization.split(" ")[1];
  // const decode = jwt.verify(token, process.env.SIGNATURE);
  // console.log(decode);
  // if (!decode) return next(new Error("Invalid Token"));
  const { user } = req;
  const profile = await User.findById(user.id)
    .select("userName email age phone")
    .lean();
  // profile.phone = Crypto.AES.decrypt(
  //   user.phone,
  //   process.env.ENCRYPTION
  // ).toString(Crypto.enc.Utf8);
  return res.status(200).json({
    status: "success",
    message: "user get profile",
    profile: {
      ...profile,
      phone: Crypto.AES.decrypt(user.phone, process.env.ENCRYPTION).toString(
        Crypto.enc.Utf8
      ),
    },
  });
});
export const profiles = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(201).json({
      status: "success",
      message: "the user created successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};
