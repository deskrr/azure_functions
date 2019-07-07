const jwt = require("jsonwebtoken");
const fs = require("fs");

export const getTimestamp = (req, res) => {
  return Date.now() / 1000;
};

export const checkAuth = fn => {
  return function(req, res) {
    if (!req.headers || !req.headers.authorization) {
      res.status(401).send("No authorization token found.");
      return;
    }
    // expect authorization header to be
    // Bearer xxx-token-xxx
    const parts = req.headers.authorization.split(" ");
    if (parts.length != 2) {
      res.status(401).send("Bad credential format.");
      return;
    }
    const scheme = parts[0];
    const credentials = parts[1];

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).send("Bad credential format.");
      return;
    }

    try {
      const data = jwt.verify(credentials, getPrivateKey);
      fn(req, res);
    } catch (e) {
      res.status(401).send("Invalid token");
    }
  };
};

export function getPrivateKey() {
  return process.env["PKEY"];
}