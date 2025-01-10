import connectDB from "./DB/connection.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/users/user.controller.js";
import messagesController from "./modules/messages/message.controller.js";
const boot = async (app, express) => {
  try {
    await connectDB();
    app.use(express.json());
    app.use("/auth", authController);
    app.use("/users", userController);
    app.use("/messages", messagesController);

    app.use("*", (req, res, next) => {
      next(new Error("not found this API"));
    });

    app.use((error, req, res, next) => {
      const status = error.cause || 500;
      return res.status(500).json({
        status: "failed",
        error: error.message,
        stack: error.stack,
      });
    });
  } catch (error) {
    console.log("error occur in boot function", error);
  }
};
export default boot;
