import apiClient from "./apiConfig";

const employeeService = {
    getAll: () => apiClient.get('/employees'),
    getById: (id: number) => apiClient.get(`/employees/${id}`),
    create: (data: any) => apiClient.post('/employees', data),
    update: (id: number, data: any) => apiClient.put(`/employees/update/${id}`, data),
    delete: (id: number) => apiClient.delete(`/employees/${id}`),
};

export default employeeService;
