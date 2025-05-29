import express from "express";
import { env } from "./configs/env.configs";
import aadharRouter from "./routers/aadhar.router";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
  })
);

app.use("/api/aadhar/", aadharRouter);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log("Server Started Successfully");
});
