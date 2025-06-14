'use client';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/button';
import DataTable from '@/components/dataTable';
import { getColumnsEmployees } from '@/constants/tableEmployee';
import employeeService from '@/services/employeeServices';
import { Employee } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/spinner';

const Employees: React.FC = () => {
    const [employeesData, setEmployeesData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const res = await employeeService.getAll();
                setEmployeesData(res.data);
            } catch (err) {
                console.error("Error al cargar empleados:", err);
                setErrorMessage('No se pudieron cargar los empleados.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id: number) => {
        const original = [...employeesData];
        setEmployeesData(employeesData.filter(e => e.id !== id)); // eliminación optimista

        try {
            await employeeService.delete(id);
        } catch (err: any) {
            console.error('Error al eliminar:', err);
            setEmployeesData(original); // revertir si falla
            setErrorMessage(err.response?.data?.message || 'Error eliminando empleado');
        }
    };

    const columns = getColumnsEmployees(handleDelete);

    return (
        <div className="md:p-6 p-2 space-y-6">
            <div className="flex justify-between flex-wrap flex-col md:flex-row ">
                <h1 className="text-3xl text-[#2A2A40] font-semibold">Empleados</h1>
                <CustomButton text="Agregar empleado" color="blue" onClick={() => router.push('/dashboard/employees/create')} />
            </div>

            {errorMessage && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{errorMessage}</div>}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable columns={columns} data={employeesData} />
            )}
        </div>
    );
};

export default Employees;
