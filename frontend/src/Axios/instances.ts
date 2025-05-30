import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL!
console.log(API_BASE)
export const aadharInstance = axios.create({
    baseURL : `${API_BASE}/api/aadhar/`
})