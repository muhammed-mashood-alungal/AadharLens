export interface ParsedData {
  name: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  //fatherName: string;
  //mobileNumber: string;
}

export interface ParsedDataComponentProps {
  parsedData: ParsedData | null;
  showAadhaarNumber: boolean;
  onToggleAadhaarVisibility: () => void;
}
