// components/DataTable.tsx
import React from 'react';

export interface Column {
    header: string;
    accessorKey: string;
    cell?: (props: { getValue: () => any }) => React.ReactNode;
    className?: string;
}

interface DataTableProps {
    columns: Column[];
    data: Record<string, any>[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto max-w-[95vw]  bg-[#2A2A40] shadow rounded text-white">
            <table className="min-w-full overflow-x-scroll divide-y  divide-gray-200">
                <thead className="bg-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.accessorKey}
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${col.className}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-600 even:bg-[#28283f] ">
                                {columns.map((col) => (
                                    <td key={col.accessorKey} className={`px-6 py-4 text-sm md:text-base whitespace-nowrap ${col.className}`}>
                                        {col.cell
                                            ? col.cell({ getValue: () => row[col.accessorKey] })
                                            : row[col.accessorKey] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-300">
                                No hay registros.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
