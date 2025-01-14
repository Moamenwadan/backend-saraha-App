import mongoose, { model, Types } from "mongoose";

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      minLength: 5,
      required: [true, "you must enter content"],
    },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", schema);
export default Message;
