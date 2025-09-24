import express from "express";
import cors from "cors";


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public")); //in this public assets some publis assets are stored which is used by any one


import userRoutes from './routes/user.routes.js'
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import productRoutes from "./routes/product.routes.js"

app.use("api/v1/product" , productRoutes)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/healthchecker", healthcheckRoutes);



export {app};