import axios from "axios";

export const aadharInstance = axios.create({
    baseURL : 'http://localhost:9000/api/aadhar'
})