import { getCompanyIdFromCookies } from "@/utils/cookies";
import apiClient from "./apiConfig";
import { Employee } from "@/constants/constants";



const employeeService = {

    getAll: () => {
        const companyId = getCompanyIdFromCookies();
        const params = companyId ? { companyId } : {};

        return apiClient.get('/employees', { params });
    },

    getById: (id: number) => apiClient.get(`/employees/${id}`),

    create: (data: Partial<Employee>) => {
        const companyId = getCompanyIdFromCookies();

        apiClient.post('/employees', { ...data, companyId })
    },

    update: (id: number, data: Partial<Employee>) => apiClient.put(`/employees/update/${id}`, data),

    delete: (id: number) => apiClient.delete(`/employees/${id}`),
};

export default employeeService;