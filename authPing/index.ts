import { checkAuth } from "../src/auth/jwt";
import { Context } from "vm";

export default checkAuth(async (context: Context, req) => {
  context.res.body = "Hii";
});