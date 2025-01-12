import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //   console.log(transporter);

  const info = await transporter.sendMail({
    from: ` <${process.env.EMAIL}>`,
    to: to,
    subject: subject,
    text: "Hi from nodemailer paploo text",
    html: html,
  });
  // console.log(info);
};
// sendEmail({
//   to: "moamenpaploo@gmail.com",
//   subject: "HI paploo",
//   html: "<h1>HI paploo</h1>",
// });
export default sendEmail;
