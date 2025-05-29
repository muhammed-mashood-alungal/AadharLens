export interface AadharFrontSideDataTypes {
    name : string;
    dateOfBirth :string;
    gender : string;
    aadharNumber : string
}

export interface AadharParsedData extends AadharFrontSideDataTypes   {
    address : string
}