import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/http-status.constants";
import { error } from "console";
import { ResponsePhrases } from "../constants/http-response.contants";
import { createHttpError } from "../utils/http-error.util";

export const validateImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files;

  if (!files || files.length != 2) {
    createHttpError(
      HttpStatus.BAD_REQUEST,
      ResponsePhrases.BOTH_IMAGES_REQUIRED
    );
  }

  if (
    !Array.isArray(files) &&
    typeof files === "object" &&
    "frontImage" in files &&
    "backImage" in files
  ) {
    const allowedExtensions = ["png", "jpeg", "jpg"];
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxFileSizeinMB = 2;

    for (let image of [files.frontImage[0], files.backImage[0]]) {
      const ext = image?.originalname.split(".").pop();
      const isValidExtension = allowedExtensions.includes(ext as string);
      const isValidMime = allowedMimeTypes.includes(image.mimetype);
      const isValidSize = image.size / (1024 * 1024) <= maxFileSizeinMB;

      if (!isValidExtension || !isValidMime) {
        throw createHttpError(
          HttpStatus.BAD_REQUEST,
          ResponsePhrases.INVALID_FILE_UPLOAD
        );
      }
      if (!isValidSize) {
        throw createHttpError(
          HttpStatus.BAD_REQUEST,
          ResponsePhrases.FILE_TOO_LARGE
        );
      }
    }
    req.frontImageBuffer = files.frontImage[0].buffer;
    req.backImageBuffer = files.backImage[0].buffer;
    next();
  } else {
    throw createHttpError(
      HttpStatus.BAD_REQUEST,
      ResponsePhrases.INVALID_FILE_UPLOAD
    );
  }
};
