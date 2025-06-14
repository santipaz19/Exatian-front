'use client';

import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/button';
import StatCard from '@/components/statCard';
import { useRouter } from 'next/navigation';
import AttendanceList from './attendance/page';
import { useEmployees } from '@/hooks/useEmployees';

const Dashboard: React.FC = () => {
    const { empleados, fetchEmployees } = useEmployees();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                setLoading(true);
                await fetchEmployees();
            } catch (error) {
                console.error('Error loading employees:', error);
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, [fetchEmployees]);

    return (
        <div>
            <div className="md:p-6 p-2 h-full">
                <div className="flex justify-between flex-wrap flex-col md:flex-row mb-5">
                    <h1 className="text-3xl text-[#2A2A40] font-semibold md:pb-0 pb-3">Estadísticas</h1>
                    <CustomButton
                        text="Agregar Empleado"
                        color="blue"
                        onClick={() => router.push('/dashboard/employees/create')}
                    />
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-8">
                        <StatCard label="Total Empleados" value="..." />
                        <StatCard label="Activos" value="..." />
                        <StatCard label="Inactivos" value="..." />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-8">
                        <StatCard label="Total Empleados" value={empleados.length} />
                        <StatCard label="Activos" value={empleados.filter(e => e.isActive).length} />
                        <StatCard label="Inactivos" value={empleados.filter(e => !e.isActive).length} />
                    </div>
                )}
            </div>
            <AttendanceList />
        </div>
    );
};

export default Dashboard;