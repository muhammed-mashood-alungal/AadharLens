import client from "../configs/google-vision.config";

export const fetchTexts = async (file: Buffer) => {
  const [result] = await client.textDetection(file);
//    const [result] = await client.textDetection({
//     image: { content: imageBuffer },
//   });
  console.log(result?.textAnnotations?.[0].description);
  return result?.textAnnotations?.[0].description
};

