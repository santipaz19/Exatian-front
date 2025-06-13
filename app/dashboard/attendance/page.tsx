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
import { LoadingSpinner } from '@/components/spinner';

const AttendancePage: React.FC = () => {
    const { attendanceData, loading: loadingAtt, createEntry, createExit } = useAttendance();
    const { empleados, loading: loadingEmp } = useEmployees();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'entrada' | 'salida'>('entrada');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const router = useRouter();

    // Loading combinado
    const isLoading = loadingAtt || loadingEmp;

    const openModal = (type: 'entrada' | 'salida') => {
        setModalType(type);
        setIsModalOpen(true);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleModalSubmit = async (data: { employeeId: number; entryTime?: string; exitTime?: string }) => {
        try {
            setErrorMessage(null);
            setSuccessMessage(null);

            let response;
            if (modalType === 'entrada') {
                response = await createEntry({ employeeId: data.employeeId, entryTime: data.entryTime! });
                setSuccessMessage('Entrada registrada correctamente.');
            } else {
                response = await createExit({ employeeId: data.employeeId, exitTime: data.exitTime! });
                if (response && response.durationMinutes !== undefined) {
                    const durationText = formatDuration(response.durationMinutes);
                    if (response.durationMinutes > 480) {
                        setErrorMessage(`⚠️ Jornada larga: ${durationText}. Supera las 8 horas.`);
                    } else {
                        setSuccessMessage(`Salida registrada. Duración: ${durationText}.`);
                    }
                    setTimeout(() => {
                        setIsModalOpen(false);
                        setSuccessMessage(null);
                        setErrorMessage(null);
                    }, 6000);
                    return;
                }
            }


            setTimeout(() => {
                setIsModalOpen(false);
                setSuccessMessage(null);
            }, 6000);

        } catch (error: any) {
            const msg = error.response?.data?.message || 'Error desconocido';
            setErrorMessage(msg);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage(null);
        setSuccessMessage(null);
    };



    return (
        <div className="md:p-6 p-2 space-y-6">
            <div className="flex md:justify-between flex-wrap items-center ">
                <h1 className="text-3xl text-[#2A2A40] font-semibold mb-3">Registro de Asistencias</h1>
                <div className="flex gap-2 justify-center">
                    <CustomButton
                        text="Ver Activos"
                        color="gray"
                        onClick={() => router.push('/dashboard/attendance/actives')}

                    />
                    <CustomButton
                        text="Agregar Entrada"
                        color="green"
                        onClick={() => openModal('entrada')}

                    />
                    <CustomButton
                        text="Agregar Salida"
                        color="red"
                        onClick={() => openModal('salida')}

                    />
                </div>
            </div>

            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
                    {errorMessage}
                    <button
                        onClick={() => setErrorMessage(null)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        ×
                    </button>
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative">
                    {successMessage}
                    <button
                        onClick={() => setSuccessMessage(null)}
                        className="absolute top-2 right-2 text-green-500 hover:text-green-700"
                    >
                        ×
                    </button>
                </div>
            )}

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <DataTable columns={columnsAttendance} data={attendanceData} />
            )}

            <ModalAttendance
                isOpen={isModalOpen}
                onClose={closeModal}
                empleados={empleados}
                onSubmit={handleModalSubmit}
                type={modalType}
            />
        </div>
    );
};

export default AttendancePage;