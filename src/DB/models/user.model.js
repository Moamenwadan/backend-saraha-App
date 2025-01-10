import mongoose from "mongoose";
export const roles = {
  user: "user",
  admin: "admin",
};
export const genders = {
  male: "male",
  female: "female",
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minLength: [3, "the letter must be betwwen 3 and 10"],
      maxLength: 10,
      //   get: (value) => {
      //     console.log(value);
      //   },
      set: (value) => {
        return value.toLowerCase();
      },
      required: [true, "you must enter userName"],
    },
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: [true, "the email must be unique"],
      required: [true, "you must enter email"],
      trim: true,
    },
    age: {
      type: Number,
      validate: {
        validator: function (v) {
          if (v < 15) {
            return false;
          }
        },
        message: (props) => `age ${props.value}  must be greater than 15`,
      },
    },
    password: {
      type: String,
      required: [true, "you must enter password"],
    },
    phone: {
      type: String,
      required: [true, "you must enter phone"],
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: Object.values(roles),
        message: "must be user or admin",
      },
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(genders),
        message: "must be male or female",
      },
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    changePasswordTime: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
