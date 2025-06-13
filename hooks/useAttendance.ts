
'use client';
import { useState, useEffect, useCallback } from 'react';
import attendanceService from '@/services/attendanceServices';
import type { Attendance } from '@/constants/constants';

export function useAttendance() {
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await attendanceService.getAll();
            setAttendanceData(res.data);
        } catch (err) {
            console.error('Error cargando registros:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const createEntry = async (data: { employeeId: number; entryTime: string }) => {
        setLoading(true);
        try {
            const res = await attendanceService.createEntry(data);
            await fetchData();
            return res.data;
        } catch (err: any) {
            console.log('Error en createEntry:', err);

            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createExit = async (data: { employeeId: number; exitTime: string }) => {
        setLoading(true);
        try {
            const res = await attendanceService.createExit(data);
            await fetchData();
            return res.data;
        } catch (err: any) {
            console.log('Error en createExit:', err);

            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        attendanceData,
        loading,
        createEntry,
        createExit,
        fetchData
    };
}
