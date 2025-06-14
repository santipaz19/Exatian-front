'use client';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/button';
import DataTable from '@/components/dataTable';
import { columnsAttendance } from '@/constants/tableAttendance';
import attendanceService from '@/services/attendanceServices';
import type { Attendance } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/spinner';

const AttendanceActiveList: React.FC = () => {
    const [data, setData] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const res = await attendanceService.getAll();
                // filtramos sólo asistencias sin exitTime
                setData(res.data.filter((a: Attendance) => !a.exitTime));
            } catch (err) {
                console.error('Error cargando asistencias activas:', err);
                setErrorMessage('No se pudieron cargar los registros activos.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="md:p-6 p-2 space-y-6">
            <div className="flex md:justify-between md:flex-row flex-col  items-center">
                <h1 className="text-3xl text-[#2A2A40] font-semibold pb-3">Asistencias activas</h1>
                <div className='flex gap-2 justify-center'>
                    <CustomButton
                        text="Recargar"
                        color="blue"
                        onClick={() => {
                            setLoading(true);
                            attendanceService.getAll()
                                .then(res => setData(res.data.filter((a: Attendance) => !a.exitTime)))
                                .catch(err => {
                                    console.error(err);
                                    setErrorMessage('Error recargando registros.');
                                })
                                .finally(() => setLoading(false));
                        }}
                    />
                    <CustomButton text="Volver" color="red" onClick={() => router.push('/dashboard/attendance')} />
                </div>

            </div>

            {errorMessage && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
                    {errorMessage}
                </div>
            )}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable
                    columns={columnsAttendance}
                    data={data}
                />
            )}
        </div>
    );
};

export default AttendanceActiveList;
