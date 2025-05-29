import { AxiosError } from "axios";
import { aadharInstance } from "../Axios/instances";

export const AadharServices = {
  extractAdharData: async (formData: FormData) => {
    try {
      const response = await aadharInstance.post("/parse", formData);
      console.log(response)
      return response.data.parsedData;
    } catch (error) {
      const err =error as AxiosError<{error : string}>
      const errMsg = err.response?.data?.error || "Something Went Wrong While Parsing Data"
      throw new Error(errMsg)
    }
  },
};
