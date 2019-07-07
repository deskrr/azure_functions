import { IUserDocument, User } from "./models/User";
import { validateObject } from "../validators";
import { consoleLog } from "..";
import { initDB } from "../db";


export async function signup(userDetails: SignupDetails) {
  initDB();
  const valid = validateObject(userDetails, {
    email: { reqd: true, type: "string" },
    firstName: { reqd: true, type: "string" },
    lastName: { reqd: true, type: "string" },
    password: { reqd: true, type: "string" }
  });
  if (!valid.isValid) {
    consoleLog("Signup: Invalid");
    return {
      status: "R_400",
      msg: valid.msg
    };
  }
  consoleLog("Signup: " + userDetails.email);

  const existing = await checkForExistingEmail(userDetails.email);
  if (existing) {
    consoleLog("Signup: Exists");
    return {
      status: "R_400",
      msg: "email_unavailable"
    };
  }

  const user = new User();
  user._id = userDetails.email;
  user.firstName = userDetails.firstName;
  user.lastName = userDetails.lastName;
  user.password = User.hashPassword(userDetails.password);
  consoleLog("Signup: Saving");
  return await user.save().then(() => {
    return {
      status: "R_200",
      msg: "success"
    }
  }, (err) => {
    return {
      status: "R_500",
      msg: "error_while_saving",
      err
    }
  });
}

export async function checkForExistingEmail(email: string) {
  return await User.findOne({ _id: email })
    .select({ _id: 1 })
    .lean()
    .then(doc => !!doc);
}

interface SignupDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
