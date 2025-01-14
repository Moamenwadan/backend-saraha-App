import Crypto from "crypto-js";

export const encryption = function ({
  plainText,
  secret = process.env.ENCRYPTION,
}) {
  return Crypto.AES.encrypt(plainText, (secret = process.env.ENCRYPTION));
};
export const dcryption = function ({
  plainText,
  secret = process.env.ENCRYPTION,
}) {
  return Crypto.AES.decrypt(plainText, secret).toString(Crypto.enc.Utf8);
};
