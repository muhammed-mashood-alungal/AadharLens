import { NextFunction, Request, Response } from "express";

export interface IAadharController {
  parseAadhar(req: Request, res: Response, next: NextFunction): Promise<void>;
}
