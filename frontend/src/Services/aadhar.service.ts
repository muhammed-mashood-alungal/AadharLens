import { aadharInstance } from "../Axios/instances";

export const AadharServices = {
  extractAdharData: async (formData: FormData) => {
    try {
      const response = await aadharInstance.post("/parse", formData);
      return response.data.extractedData;
    } catch (error) {
      console.log(error);
    }
  },
};
