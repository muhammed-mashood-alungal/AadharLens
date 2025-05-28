import { Request, Response, NextFunction } from "express";
import { IAadharController } from "../interface/aadhar.controller.interface.ts";
import { ResponsePhrases } from "../../constants/http-response.contants.js";
import { HttpStatus } from "../../constants/http-status.constants.js";
import { IAadharServices } from "../../services/interface/aadhar.service.interface.js";

export class AadharController implements IAadharController {
  constructor(private _aadharServices: IAadharServices) {}

  async parseAadhar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const files = req.files;
      if (
        files &&
        !Array.isArray(files) &&
        typeof files === "object" &&
        "frontImage" in files &&
        "backImage" in files
      ) {
        const frontImageBuffer = files.frontImage?.[0]?.buffer;
        const backImageBuffer = files.backImage?.[0]?.buffer;

        if (!frontImageBuffer || !backImageBuffer) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: ResponsePhrases.BOTH_IMAGES_REQUIRED });
          return;
        }

        const data = await this._aadharServices.parseData(
          frontImageBuffer,
          backImageBuffer
        );
        res.status(HttpStatus.OK).json({ success: true, parsedData: data });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: ResponsePhrases.INVALID_FILE_UPLOAD });
      }
    } catch (error) {
      next(error);
    }
  }
}
