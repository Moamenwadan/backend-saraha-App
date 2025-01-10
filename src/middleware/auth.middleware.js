import jwt from "jsonwebtoken";
import Crypto from "crypto-js";
import User from "../DB/models/user.model.js";

const isAuthenticated = async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    // console.log(auth);
    if (!authorization || !authorization.startsWith("Bearear"))
      return next(new Error("Invalid Bearear Token", { cause: 403 }));

    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SIGNATURE);
    const user = await User.findById(decode.id);
    if (!user) return next(new Error("the user doesn't exist", { cause: 404 }));

    // console.log(user);
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
export default isAuthenticated;
