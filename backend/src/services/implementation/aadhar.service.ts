import { fetchTexts } from "../../utils/fetch-texts.util";
import { IAadharServices } from "../interface/aadhar.service.interface";

export class AadharServices implements IAadharServices {
  async parseData(frontImg: Buffer, backImg: Buffer): Promise<any> {
    const textInFrontSide = fetchTexts(frontImg);
    const textInBackSide = fetchTexts(backImg);
    console.log("Front +++++++++++++++++++++");
    console.log(textInFrontSide);
    console.log("Back +++++++++++++++++++++++");
    console.log(textInBackSide);
    //// logics ....
  }
}
