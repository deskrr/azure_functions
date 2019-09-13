import { signup } from "../src/auth/signup";
import { initAzure, setJSONResponse } from "..";

export default async function(context, req) {
  if (await initAzure(context)) {
    setJSONResponse(context, await signup(req.body));
  }
}
