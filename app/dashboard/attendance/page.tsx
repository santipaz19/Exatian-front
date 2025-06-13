'use client';
import React, { useState, useEffect } from 'react';
import CustomButton from '@/components/button';
import DataTable from '@/components/dataTable';
import ModalAttendance from '@/components/modalAttendance';
import { columnsAttendance } from '@/constants/tableAttendance';
import { useAttendance } from '@/hooks/useAttendance';
import { useEmployees } from '@/hooks/useEmployees';
import { useRouter } from 'next/navigation';
import { formatDuration } from '@/utils/time';

interface AttendanceListProps {
    setIsLoading?: (loading: boolean) => void;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ setIsLoading }) => {
    const { attendanceData, loading: loadingAtt, createEntry, createExit } = useAttendance();
    const { empleados, loading: loadingEmp } = useEmployees();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'entrada' | 'salida'>('entrada');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter()

    const openModal = (type: 'entrada' | 'salida') => {
        setModalType(type);
        setIsModalOpen(true);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleModalSubmit = async (data: { employeeId: number; entryTime?: string; exitTime?: string }) => {
        try {
            setIsLoading?.(true);
            setErrorMessage(null);
            setSuccessMessage(null);

            let response;
            if (modalType === 'entrada') {
                response = await createEntry({ employeeId: data.employeeId, entryTime: data.entryTime! });
            } else {
                response = await createExit({ employeeId: data.employeeId, exitTime: data.exitTime! });
                if (response && response.durationMinutes !== undefined) {
                    const durationText = formatDuration(response.durationMinutes)
                    if (response.durationMinutes > 480) {
                        setErrorMessage(`⚠️ Jornada larga: ${durationText}. Supera las 8 horas.`);
                    } else {
                        setSuccessMessage(`Salida registrada. Duración: ${durationText}.`);
                    }
                    setTimeout(() => {
                        setIsModalOpen(false);
                        setSuccessMessage(null);
                    }, 6000);
                    return;
                }
            }
            setIsModalOpen(false);
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Error desconocido';
            setErrorMessage(msg);
        } finally {
            setIsLoading?.(false);
        }
    };

    const loading = loadingAtt || loadingEmp;

    useEffect(() => {
        setIsLoading?.(loading);
    }, [loading, setIsLoading]);

    return (
        <div className="md:p-6 p-2  space-y-6">
            <div className="flex justify-between flex-wrap items-center">
                <h1 className="text-3xl text-[#2A2A40] font-semibold">Registro de Asistencias</h1>
                <div className="flex gap-2">
                    <CustomButton text="Ver Activos" color="gray" onClick={() => router.push('/dashboard/attendance/actives')} />
                    <CustomButton text="Agregar Entrada" color="green" onClick={() => openModal('entrada')} />
                    <CustomButton text="Agregar Salida" color="red" onClick={() => openModal('salida')} />
                </div>
            </div>

            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                    {successMessage}
                </div>
            )}

            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                <DataTable columns={columnsAttendance} data={attendanceData} />
            )}

            <ModalAttendance
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setErrorMessage(null);
                    setSuccessMessage(null);
                }}
                empleados={empleados}
                onSubmit={handleModalSubmit}
                type={modalType}

            />
        </div>
    );
};

export default AttendanceList;