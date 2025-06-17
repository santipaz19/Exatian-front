'use client';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/button';
import DataTable from '@/components/dataTable';
import { getColumnsEmployees } from '@/constants/tableEmployee';
import employeeService from '@/services/employeeServices';
import { Employee } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/spinner';
import { useEmployees } from '@/hooks/useEmployees';

const Employees: React.FC = () => {

    const { empleados, fetchEmployees, deleteEmployee } = useEmployees();

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();


    useEffect(() => {
        const loadEmployees = async () => {
            try {
                setLoading(true);
                await fetchEmployees();
            } catch (error) {
                console.error('Error loading employees:', error);
                setErrorMessage('No se pudieron cargar los empleados.');
            } finally {
                setLoading(false);
            }
        };
        loadEmployees();
    }, [fetchEmployees]);

    const columns = getColumnsEmployees(deleteEmployee);

    return (
        <div className="md:p-6 p-2 space-y-6">
            <div className="flex justify-between flex-wrap flex-col md:flex-row ">
                <h1 className="text-3xl text-[#2A2A40] font-semibold">Empleados</h1>
                <CustomButton text="Agregar Empleado" color="blue" onClick={() => router.push('/dashboard/employees/create')} />
            </div>

            {errorMessage && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{errorMessage}</div>}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable columns={columns} data={empleados} />
            )}
        </div>
    );
};

export default Employees;
