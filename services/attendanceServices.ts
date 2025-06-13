import apiClient from "./apiConfig";

const attendanceService = {
    getAll: () => apiClient.get('/attendance'),
    createEntry: (data: any) => apiClient.post('/attendance/entry', data),
    createExit: (data: any) => apiClient.post('/attendance/exit', data),
    getById: (id: number) => apiClient.get(`/attendance/employee/${id}`),
};

export default attendanceService;
