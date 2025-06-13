import React from 'react';

export const columnsAttendance = [
    {
        header: 'Empleado',
        accessorKey: 'employee',
        cell: ({ getValue }: any) => {
            const value = getValue();
            return value ? value.fullName : '-';
        },
    },
    {
        header: 'Hora Ingreso',
        accessorKey: 'entryTime',
        cell: ({ getValue }: any) => {
            const value = getValue();
            return value
                ? new Date(value).toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                })
                : '-';
        },
    },
    {
        header: 'Hora Salida',
        accessorKey: 'exitTime',
        cell: ({ getValue }: any) => {
            const value = getValue();
            return value
                ? new Date(value).toLocaleString('es-AR', {

                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                })
                : '-';
        },
    },
    {
        header: 'Tiempo transcurrido',
        className: 'md:block hidden',
        accessorKey: 'durationMinutes',
        cell: ({ getValue }: any) => {
            const value = getValue();
            if (!value) return '-';

            const totalSeconds = value * 60;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            return `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
    },
];
