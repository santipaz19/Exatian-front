"use client";

import { Employee } from "@/constants/constants";
import { toISOStringWithOffset } from "@/utils/time";
import { useState } from "react";

interface ModalAttendanceProps {
    isOpen: boolean;
    onClose: () => void;
    empleados: Employee[];
    type: "entrada" | "salida";
    onSubmit: (data: { employeeId: number; entryTime?: string; exitTime?: string }) => void;
}


export default function ModalAttendance({
    isOpen,
    onClose,
    empleados,
    onSubmit,
    type,
}: ModalAttendanceProps) {
    const [employeeId, setEmployeeId] = useState<number | "">("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (employeeId && fecha && hora) {
            const dt = new Date(`${fecha}T${hora}:00`);
            const fechaFormateada = toISOStringWithOffset(dt);

            if (type === "entrada") {
                onSubmit({ employeeId, entryTime: fechaFormateada });
            } else {
                onSubmit({ employeeId, exitTime: fechaFormateada });
            }

            setEmployeeId('');
            setFecha('');
            setHora('');
            onClose();
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white text-[#2A2A40] rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-4">
                    {type === "entrada" ? "Agregar entrada" : "Agregar salida"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Empleado */}
                    <div>
                        <label className="block text-sm font-medium">Empleado</label>
                        <select
                            value={employeeId}
                            onChange={(e) => setEmployeeId(Number(e.target.value))}
                            className="mt-1 block w-full border rounded-md p-2 cursor-pointer"
                            required
                        >
                            <option value="">Seleccionar empleado</option>
                            {empleados.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium">Fecha</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            className="mt-1 block w-full border rounded-md p-2 cursor-pointer"
                            required
                        />
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="block text-sm font-medium">Hora</label>
                        <input
                            type="time"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            className="mt-1 block w-full border rounded-md p-2 cursor-pointer"
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl font-bold cursor-pointer"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
