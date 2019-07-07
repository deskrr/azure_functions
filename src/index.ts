let logFn = null

export function setLogFunction(fn) {
  logFn = fn;
}

export function consoleLog(msg) {
  if (logFn && typeof logFn === "function") {
    logFn(msg);
  }
}