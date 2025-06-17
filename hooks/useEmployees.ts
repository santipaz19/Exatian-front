'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Employee } from '@/constants/constants';
import employeeService from '@/services/employeeServices';

export function useEmployees() {
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const res = await employeeService.getAll();
            setEmpleados(res.data.data);
        } catch (err) {
            console.error('Error cargando empleados:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);



    const createEmployee = async (data: Employee) => {
        try {
            await employeeService.create(data);
            alert("Empleado creado correctamente");
        } catch (error) {
            alert("Hubo un error al crear el empleado");
            console.error(error);
        }
    };

    const updateEmployee = async (id: number, data: Employee) => {
        await employeeService.update(id, data);
        await fetchEmployees();
    };

    const deleteEmployee = async (id: number) => {
        await employeeService.delete(id);
        await fetchEmployees();
    };

    return {
        empleados,
        loading,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        fetchEmployees
    };
}
