import { AadharFrontSideDataTypes } from "../types/aadhar/aadhar.types";
import validateAadharNumber from "./validate-aadhar-number.util";

function extractName(lines: string[]) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes("NAME") || line.includes("नाम")) {
      return lines[i + 1].trim() || "";
    }

    const upperLine = line.toUpperCase();
    if (
      /^[A-Z ]+$/i.test(line) &&
      upperLine.split(" ").length >= 2 &&
      !upperLine.includes("INDIA") &&
      !upperLine.includes("OF") &&
      !upperLine.includes("DOB") &&
      !upperLine.includes("YEAR") &&
      !upperLine.includes("FEMALE") &&
      !upperLine.includes("MALE")
    ) {
      return lines[i].trim();
    }
  }

  return "";
}

function extractDOB(line: string): string {
  const dobRegexes = [
    /\b(\d{2})[-/.](\d{2})[-/.](\d{2,4})\b/,
    /\b(\d{4})[-/.](\d{2})[-/.](\d{2})\b/,
    /\b(\d{4})\b/,
  ];

  for (const regex of dobRegexes) {
    const match = line.match(regex);
    if (match) {
      let [_, p1, p2, p3] = match;
      if (p1.length === 4) return `${p1}-${p2}-${p3}`;
      if (p3.length === 4) return `${p3}-${p2}-${p1}`;
      if (p3.length === 2) return `20${p3}-${p2}-${p1}`;
    }
  }
  return "";
}

function extractGender(line: string) {
  if (line.includes("MALE")) {
    return "Male";
  } else if (line.includes("FEMALE")) {
    return "Female";
  } else {
    return "";
  }
}

function extractAadharNumber(line: string) {
  const cleaned = line.replace(/\s+/g, "");

  if (cleaned.length == 12 && validateAadharNumber(cleaned)) {
    return line;
  }
  return "";
}

export function extractAddress(lines: string[]) {
  const addressLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toUpperCase();

    if (line.includes("ADDRESS")) {
      for (let j = i; j < lines.length; j++) {
        const current = lines[j].trim();
        if (
          /^\d{4}\s\d{4}\s\d{4}$/.test(current) ||
          current.includes("@") ||
          current.includes("WWW.") ||
          /^[0-9]{4}$/.test(current)
        ) {
          break;
        }
        addressLines.push(current);
      }
      break;
    }
  }
  return addressLines.join(" ");
}

export function fetchFrontSideData(lines: string[]): AadharFrontSideDataTypes {
  const frontSideData: AadharFrontSideDataTypes = {
    name: "",
    dateOfBirth: "",
    gender: "",
    aadharNumber: "",
  };

  frontSideData.name = extractName(lines);

  for (let i = 0; i < lines.length; i++) {
    if (!frontSideData.dateOfBirth) {
      const dob = extractDOB(lines[i].trim());
      if (dob) frontSideData.dateOfBirth = dob;
    }
    if (!frontSideData.gender) {
      const gender = extractGender(lines[i].trim().toUpperCase());
      if (gender) frontSideData.gender = gender;
    }
    if (!frontSideData.aadharNumber) {
      const aadharNumber = extractAadharNumber(lines[i].trim());
      if (aadharNumber) frontSideData.aadharNumber = aadharNumber;
    }
  }

  return frontSideData;
}
