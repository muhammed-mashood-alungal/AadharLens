import * as multer from "multer";

declare global {
  namespace Express {
    interface Request {
      files?: {
        [fieldname: string]: multer.File[];
      };
      frontImageBuffer?: Buffer;
      backImageBuffer?: Buffer;
    }
  }
}
