import bcrypt from "bcrypt";
export const hash = function ({ plainText, rounds = process.env.SALT_ROUND }) {
  return bcrypt.hashSync(plainText, Number(rounds));
};

export const compareHashing = function ({ plainText, passwordFromDatabase }) {
  return bcrypt.compareSync(plainText, passwordFromDatabase);
};
