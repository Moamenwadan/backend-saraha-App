import jwt from "jsonwebtoken";

export const generateToken = function ({
  plainText,
  signature = process.env.SIGNATURE,
}) {
  return jwt.sign(plainText, signature, { expiresIn: "3h" });
};
export const verifyToken = function ({
  plainText,
  signature = process.env.SIGNATURE,
}) {
  return jwt.verify(plainText, signature);
};
