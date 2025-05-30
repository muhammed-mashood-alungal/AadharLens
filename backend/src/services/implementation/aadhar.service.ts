import { ResponsePhrases } from "../../constants/http-response.contants";
import { HttpStatus } from "../../constants/http-status.constants";
import { AadharParsedData } from "../../types/aadhar/aadhar.types";
import {
  extractAddress,
  fetchFrontSideData,
} from "../../utils/fetch-aadhar-fields.util";
import { fetchTexts } from "../../utils/fetch-texts.util";
import { createHttpError } from "../../utils/http-error.util";
import { IAadharServices } from "../interface/aadhar.service.interface";

export class AadharServices implements IAadharServices {
  async parseData(
    frontImg: Buffer,
    backImg: Buffer
  ): Promise<AadharParsedData> {
    const textInFrontSide = await fetchTexts(frontImg);
    const textInBackSide = await fetchTexts(backImg);

    const frontLines = textInFrontSide
      ?.split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
    const backLines = textInBackSide
      ?.split("\n")
      .map((v) => v.trim())
      .filter(Boolean);

    if (!frontLines) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        ResponsePhrases.FRONT_SIDE_NOT_CLEAR
      );
    }
    if (!backLines) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        ResponsePhrases.BACK_SIDE_NOT_CLEAR
      );
    }

    const { name, dateOfBirth, gender, aadharNumber } =
      fetchFrontSideData(frontLines);

    if (!name || !dateOfBirth || !gender || !aadharNumber) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        ResponsePhrases.FRONT_SIDE_EXTRACT_FAILED
      );
    }


    const address = extractAddress(backLines);
    if (!address) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        ResponsePhrases.BACK_SIDE_EXTRACT_FAILED
      );
    }
    return { name, dateOfBirth, gender, aadharNumber, address };
  }
}
