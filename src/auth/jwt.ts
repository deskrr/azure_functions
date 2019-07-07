const jwt = require("jsonwebtoken");
const fs = require("fs");

export const getTimestamp = (req, res) => {
  return Date.now() / 1000;
};

export function getToken(payload: unknown) {
  return jwt.sign(payload, getPrivateKey());
}

export const checkAuth = fn => {
  return async function(ctx, req) {
    if (!req.headers || !req.headers.authorization) {
      ctx.res.status = 401;
      ctx.res.body = "no_token";
      return;
    }
    // expect authorization header to be
    // Bearer xxx-token-xxx
    const parts = req.headers.authorization.split(" ");
    if (parts.length != 2) {
      ctx.res.status = 401;
      ctx.res.body = "bad_token_format";
      return;
    }
    const scheme = parts[0];
    const credentials = parts[1];

    if (!/^Bearer$/i.test(scheme)) {
      ctx.res.status = 401;
      ctx.res.body = "bad_token_format";
      return;
    }

    try {
      const data = jwt.verify(credentials, getPrivateKey());
      fn(ctx, req);
    } catch (e) {
      ctx.res.status = 401;
      ctx.res.body = "invalid_token";
    }
  };
};

export function getPrivateKey() {
  return process.env["PKEY"];
}