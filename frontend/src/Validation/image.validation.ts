export const validateImage = (file: File) => {
  const ext = file.name.split(".").pop();
  const allowedExtensions = ["png", "jpeg", "jpg"];
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const isValidExtension = allowedExtensions.includes(ext as string);
  const isValidMimeType = allowedTypes.includes(file.name);
  if (!isValidExtension  || isValidMimeType) {
    return false;
  }
  return true;
};
