import express from "express";
import { env } from "./configs/env.configs";
import aadharRouter from "./routers/aadhar.router";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
const app = express();

const CLIENT_ORIGIN = env.CLIENT_ORIGIN!;
console.log('client '+CLIENT_ORIGIN)

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use("/api/aadhar/", aadharRouter);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log("Server Started Successfully");
});
