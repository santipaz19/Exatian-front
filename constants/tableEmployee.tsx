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
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600  rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none shadow-md hover:shadow-lg"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Historial
                        </Link>

                        <Link
                            href={`/dashboard/employees/${id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600   rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none shadow-md hover:shadow-lg"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                        </Link>

                        <button
                            onClick={() => onDelete(id)}
                            className="inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600   rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none shadow-md hover:shadow-lg"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                        </button>
                    </div>
                );
            },
        },
    ];
}
