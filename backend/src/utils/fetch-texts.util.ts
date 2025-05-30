import client from "../configs/google-vision.config";

export const fetchTexts = async (file: Buffer) => {
  const [result] = await client.textDetection(file);

  return result?.textAnnotations?.[0]?.description
};

