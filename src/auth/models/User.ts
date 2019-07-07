import { Schema, model, Document, Model } from "mongoose";
import { createHmac } from "crypto";

// _id is email
const userSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  password: { type: String, select: false }
});

userSchema.method("comparePassword", function(password: string): boolean {
  if (
    createHmac("sha256", password)
      .update("I love cupcakes")
      .digest("hex") === this.password
  ) {
    return true;
  }
  return false;
});

userSchema.static(
  "hashPassword",
  (password: string): string => {
    return createHmac("sha256", password)
      .update("I love cupcakes")
      .digest("hex");
  }
);

export const User = model<IUser, IUserModel>("User", userSchema);

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): string;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserDocument extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
}
