import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
const port = config.port;
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.mongodbUrl as string);
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
main();
