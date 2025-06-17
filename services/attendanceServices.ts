import { getCompanyIdFromCookies } from "@/utils/cookies";
import apiClient from "./apiConfig";

const attendanceService = {
    getAll: () => {
        const companyId = getCompanyIdFromCookies();
        const params = companyId ? { companyId } : {};
        return apiClient.get('/attendance', { params });
    },
    createEntry: (data: { employeeId: number, entryTime: string }) => apiClient.post('/attendance/entry', data),
    createExit: (data: { employeeId: number, exitTime: string }) => apiClient.post('/attendance/exit', data),
    getById: (id: number) => apiClient.get(`/attendance/employee/${id}`),
};

export default attendanceService;
