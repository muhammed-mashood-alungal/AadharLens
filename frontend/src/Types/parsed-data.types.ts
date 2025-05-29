export interface ExtractedData {
  name: string;
  aadhaarNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  fatherName: string;
  mobileNumber: string;
  email: string;
}

export interface ParsedDataComponentProps {
  extractedData: ExtractedData | null;
  showAadhaarNumber: boolean;
  onToggleAadhaarVisibility: () => void;
}
