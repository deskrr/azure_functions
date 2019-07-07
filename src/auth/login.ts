import { consoleLog } from "..";
import { validateObject } from "../validators";

export async function login(loginDetails) {
  const valid = validateObject(loginDetails, {
    email: { reqd: true, type: "string" },
    password: { reqd: true, type: "string" }
  });
  if (!valid.isValid) {
    consoleLog("Signup: Invalid");
    return {
      status: "R_400",
      msg: valid.msg
    };
  }

  
}

interface LoginParams {
  email: string;
  password: string;
}