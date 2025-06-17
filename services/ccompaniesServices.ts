
import { Company } from "@/constants/constants";
import apiClient from "./apiConfig";

const companiesService = {
    getAll: () => {
        return apiClient.get('/companies');
    },
    create: (data: Partial<Company>) => apiClient.post('/companies', data),
    login: (data: { email: string, password: string }) => apiClient.post('/companies/login', data),
    update: (id: number, data: Partial<Company>) => apiClient.put(`/companies/update/${id}`, data),
    delete: (id: number) => apiClient.delete(`/companies/${id}`),
};

export default companiesService;
