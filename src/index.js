import connectDB from "./db/index.js";
import dotenv from "dotenv";

import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4001, () => {
      console.log(`server is connected on port ${process.env.PORT || 4001}`);
    });
  })
  .catch((error) => {
    console.log("the server is giving error", error);
  });
