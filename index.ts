import { setLogFunction } from "./src";
import { Context } from "@azure/functions";

export function initAzure(ctx: Context) {
  setLogFunction((...msg) => ctx.log(...msg));
}

export function setJSONResponse(context: Context, obj: unknown) {
  context.res.headers = {
    "Content-Type": "application/json"
  };
  context.res.body = JSON.stringify(obj || {});
}
