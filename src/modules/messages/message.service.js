import Message from "../../DB/models/message.model.js";
import User from "../../DB/models/user.model.js";

import asyncHandler from "../../utils/errorHandling/asyncHandler.js";
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { receiver, content } = req.body;
  const user = await User.findById(receiver);
  if (!user) return next(new Error("the user doesn't exist", { cause: 404 }));

  const message = await Message.create({
    content,
    receiver,
    sender: req.user._id,
  });
  return res.status(201).json({
    status: "success",
    mess: "message sent successfully",
    message: message.content,
  });
});
export const getSingleMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (
    req.user._id.toString() == message.receiver.toString() ||
    req.user._id.toString() == message.sender.toString()
  )
    return res.status(200).json({ status: "success", message });

  return next(new Error("not authorized", { cause: 401 }));
});
export const getAllMessages = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { flag } = req.query;
  if (!flag) return next(new Error("you didn't enter flag", { cause: 400 }));
  let messages;
  if (flag == "inbox") {
    messages = await Message.find({ receiver: user._id });
  } else {
    messages = await Message.find({ sender: user._id });
  }
  return res.status(200).json({ status: "success", messages });
});
export const editMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (req.user._id.toString() == message.sender.toString()) {
    const updateMessage = await Message.findByIdAndUpdate(
      id,
      {
        content: req.body.content,
      },
      { new: true }
    );
    return res.status(200).json({ status: "success", updateMessage });
  }

  return next(new Error("not authorized for receiver", { cause: 401 }));
});
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (req.user._id.toString() == message.sender.toString()) {
    const deleteM = await Message.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ status: "success", message: "deleted successfully" });
  }

  return next(new Error("not authorized for receiver", { cause: 401 }));
});
