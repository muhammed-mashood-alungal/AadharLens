import express from "express";
import { env } from "./configs/env.configs";

const app = express();

app.listen(env.PORT, () => {
  console.log("Server Started Successfully");
});
