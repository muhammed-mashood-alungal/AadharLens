export interface AadharFrontSideDataTypes {
    name : string;
    DOB :string;
    gender : string;
    aadharNumber : string
}

export interface AadharParsedData extends AadharFrontSideDataTypes   {
    address : string
}