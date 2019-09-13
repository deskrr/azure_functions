import { Context } from "@azure/functions";
import { initAzure, setJSONResponse } from "..";
import { login } from "../src/auth/login";

export default async function(context: Context, req) {
  if (await initAzure(context)) {
    setJSONResponse(context, await login(req.body));
  }
}
