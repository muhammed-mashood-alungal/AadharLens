const validator = require("aadhaar-validator");

export default function validateAadharNumber(aadharNumber: string) {
  return validator.isValidNumber(aadharNumber);
}
