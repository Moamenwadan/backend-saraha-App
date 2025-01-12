import { signup } from "./generateHTML.js";
import EventEmitter from "events";
import jwt from "jsonwebtoken";
import sendEmail from "./sendEmail.js";
const event = new EventEmitter();
event.on("send", async (email) => {
  const token = jwt.sign({ email }, process.env.SIGNATURE);
  const link = `http://localhost:3000/auth/activate_acount/${token}`;
  await sendEmail({
    to: email,
    subject: "activate account",
    html: signup(link),
  });
});
export default event;
