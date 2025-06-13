export interface Employee {
    id?: number;
    fullName: string;
    dni: string;
    email: string;
    position?: string;
    hireDate?: string;
    isActive?: boolean;
}

export interface Attendance {
    id: number;
    employeeId: number;
    entryTime: string;
    exitTime: string | null;
    durationMinutes: number | null;
    employee?: Employee;
}

export const menuItems = [
    { label: 'Inicio', href: '/dashboard' },
    { label: 'Empleados', href: '/dashboard/employees' },
    { label: 'Asistencias', href: '/dashboard/attendance' },
];