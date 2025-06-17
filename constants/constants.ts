export interface Employee {
    id?: number;
    fullName: string;
    dni: string;
    email: string;
    position?: string;
    hireDate?: string;
    isActive?: boolean;
    companyId?: number
}

export interface Attendance {
    id: number;
    employeeId: number;
    entryTime: string;
    exitTime: string | null;
    durationMinutes: number | null;
    companyId?: number
    employee?: Employee;
}

export interface Company {
    id: number;
    name: string;
    phone?: string;
    email?: string;
    taxId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


export const menuItems = [
    { label: 'Inicio', href: '/dashboard' },
    { label: 'Empleados', href: '/dashboard/employees' },
    { label: 'Asistencias', href: '/dashboard/attendance' },
];

