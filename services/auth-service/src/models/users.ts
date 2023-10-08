import { Date,Schema, model} from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    other_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    authentication: {
      password: { type: String, required: true },
    },
    account_number: {
      type: String,
      required: true,
      unique: true,
    },
    account_balance: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
    },
    phone_number: {
      type: String,
      unique: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    date_of_birth: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
