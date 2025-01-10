import connectDB from "./DB/connection.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/users/user.controller.js";
import messagesController from "./modules/messages/message.controller.js";
import globalErrorHandler from "./utils/errorHandling/globalErrorHandler.js";
import notFoundHandler from "./utils/errorHandling/notFoundHandler.js";
const boot = async (app, express) => {
  try {
    await connectDB();
    app.use(express.json());
    app.use("/auth", authController);
    app.use("/users", userController);
    app.use("/messages", messagesController);

    app.use("*", notFoundHandler);

    app.use(globalErrorHandler);
  } catch (error) {
    console.log("error occur in boot function", error);
  }
};
export default boot;
