import { consoleLog } from "..";
import { validateObject } from "../validators";
import { User } from "./models/User";
import { getToken } from "./jwt";

export async function login(loginDetails: LoginParams) {
  const valid = validateObject(loginDetails, {
    email: { reqd: true, type: "string" },
    password: { reqd: true, type: "string" },
    scope: { reqd: true, type: ["WEB", "MONITOR"]}
  });
  if (!valid.isValid) {
    consoleLog("Signup: Invalid");
    return {
      status: "R_400",
      msg: valid.msg
    };
  }

  const user = await User.findOne({ _id: loginDetails.email }).select('+password').exec();
  if (!user) {
    return {
      status: "R_400",
      msg: "invalid_email"
    }
  }

  if (user.comparePassword(loginDetails.password)) {
    return {
      status: "R_200",
      msg: "success",
      token: getToken({ user: user._id, scope: loginDetails.scope })
    }
  } else {
    return {
      status: "R_401",
      msg: "invalid_pwd"
    }
  }
}

interface LoginParams {
  email: string;
  password: string;
  scope: "WEB" | "MONITOR";
}