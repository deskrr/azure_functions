import mongoose = require('mongoose');
import { consoleLog } from '..';
mongoose.connect(process.env["AZURE_COSMOS_CONNECTION_STRING"], { useNewUrlParser: true });

export const dbConnected = () => {
  return true;
}

export function initDB() {
  consoleLog("Init DB");
}