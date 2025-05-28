import express from "express";
import { env } from "./configs/env.configs";
import aadharRouter from "./routers/aadhar.router";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();


app.use('/api/aadhar/',aadharRouter)


app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log("Server Started Successfully");
});
