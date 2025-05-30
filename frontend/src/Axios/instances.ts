import axios from "axios";

export const aadharInstance = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_URL}/api/aadhar/`
})