import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error.util";
import { HttpStatus } from "../constants/http-status.constants";
import { ResponsePhrases } from "../constants/http-response.contants";

export const errorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = ResponsePhrases.INTERNAL_SERVER_ERROR;

  if (err instanceof HttpError) {
    (statusCode = err.statusCode), (message = err.message);
  }
  console.log(err)
  res.status(statusCode).json({ error: message });
};
