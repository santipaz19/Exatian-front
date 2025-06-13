// src/constants/tableEmployee.tsx
import Link from 'next/link';
import React from 'react';


export function getColumnsEmployees(onDelete: (id: number) => void) {
    return [
        { header: 'Nombre completo', accessorKey: 'fullName' },
        { header: 'DNI', accessorKey: 'dni', },
        { header: 'Email', accessorKey: 'email' },
        { header: 'Puesto', accessorKey: 'position' },
        {
            header: 'Fecha de ingreso',
            accessorKey: 'hireDate',
            cell: ({ getValue }: any) => {
                const value = getValue() as string;
                return value ? new Date(value).toLocaleDateString() : '-';
            },
        },
        {
            header: 'Activo',
            accessorKey: 'isActive',
            cell: ({ getValue }: any) => (getValue() ? 'Sí' : 'No'),
        },
        {
            header: 'Acción',
            accessorKey: 'id',
            cell: ({ getValue }: any) => {
                const id = getValue() as number;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/dashboard/employees/${id}/history`}
                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Ver historial
                        </Link>
                        <Link
                            href={`/dashboard/employees/${id}`}
                            className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={() => onDelete(id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                        >
                            Eliminar
                        </button>
                    </div>
                );
            },
        },
    ];
}
