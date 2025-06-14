import axios from "axios";

const LOCAL_API_URL = "http://localhost:5000/";
const REMOTE_API_URL = "https://exatian-back.onrender.com";

const baseURL = process.env.NEXT_PUBLIC_API_URL || REMOTE_API_URL;

const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
