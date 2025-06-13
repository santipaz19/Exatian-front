// src/services/apiClient.ts
import axios from "axios";

const LOCAL_API_URL = "http://localhost:5000/";
const REMOTE_API_URL = "https://api.tudominio.com/api";

const baseURL = process.env.NEXT_PUBLIC_API_URL || LOCAL_API_URL;

const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
