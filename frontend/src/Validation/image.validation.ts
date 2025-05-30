export const validateImage = (file: File):{status : boolean , message? : string} => {
  const ext = file.name.split(".").pop();
  const allowedExtensions = ["png", "jpeg", "jpg"];
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const isValidExtension = allowedExtensions.includes(ext as string);
  const isValidMimeType = allowedTypes.includes(file.name);

  const fileSizeMB = file.size / (1024 * 1024);
  
  if (!isValidExtension  || isValidMimeType) {
    return {status : false , message : "Invalid File Type"};
  }
  const MAX_SIZE_MB = 10;
  if (fileSizeMB > MAX_SIZE_MB) {
    return {status : false , message : "Large file. Please upload a file under 5MB."}
  }
  return {status : true };
};
