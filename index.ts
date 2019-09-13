import { setLogFunction } from "./src";
import { Context } from "@azure/functions";
import { initDB } from "./src/db";

export async function initAzure(ctx: Context) {
  setLogFunction((...msg) => ctx.log(...msg));
  if (!(await initDB())) {
    setJSONResponse(ctx, {
      status: "R_500",
      msg: "Failed initializing db"
    });
    return false;
  }
  return true;
}

export function setJSONResponse(context: Context, obj: unknown) {
  context.res.headers = {
    "Content-Type": "application/json"
  };
  context.res.body = JSON.stringify(obj || {});
}
