'use client'

import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/button';
import DataTable from '@/components/dataTable';

import { Attendance } from '@/constants/constants';
import { useParams, useRouter } from 'next/navigation';
import attendanceService from '@/services/attendanceServices';
import { columnsAttendance } from '@/constants/tableAttendance';
import { LoadingSpinner } from '@/components/spinner';


const Employees: React.FC = () => {
    const [attendanceServices, setAttendanceService] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter()
    const params = useParams<{ id: string }>();
    const id = params.id;


    useEffect(() => {
        attendanceService.getById(Number(id))
            .then(response => {
                setAttendanceService(response.data);
                console.log(response.data);

            })
            .catch(error => {
                console.error("Error al cargar historial:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="md:p-6 p-2 space-y-6">
            <div className="flex justify-between flex-col md:flex-row ">
                <h1 className='text-3xl text-[#2A2A40] font-semibold'> Historial de ingresos</h1>
                <CustomButton text="Volver" color="red" onClick={() => router.push('/dashboard/employees')} />
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable columns={columnsAttendance} data={attendanceServices} />
            )}
        </div>
    );
};

export default Employees;
