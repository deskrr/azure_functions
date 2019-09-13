import mongoose = require('mongoose');
import { consoleLog } from '..';

export const dbConnected = () => {
  return true;
}

export async function initDB() {
  try {
    await mongoose.connect(process.env["AZURE_COSMOS_CONNECTION_STRING"], { useNewUrlParser: true });
    return true;
  } catch (e) {
    consoleLog("Failed mongoose connection");
    consoleLog(JSON.stringify(e));
  }
  return false;
}