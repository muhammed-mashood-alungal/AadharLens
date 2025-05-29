import { Request, Response, NextFunction } from "express";
import { IAadharController } from "../interface/aadhar.controller.interface.ts";
import { ResponsePhrases } from "../../constants/http-response.contants";
import { HttpStatus } from "../../constants/http-status.constants";
import { IAadharServices } from "../../services/interface/aadhar.service.interface";

export class AadharController implements IAadharController {
  constructor(private _aadharServices: IAadharServices) {}

  async parseAadhar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this._aadharServices.parseData(
        req.frontImageBuffer as Buffer,
        req.backImageBuffer as Buffer
      );
      console.log(data)
      res.status(HttpStatus.OK).json({ success: true, parsedData: data });
    } catch (error) {
      next(error);
    }
  }
}
