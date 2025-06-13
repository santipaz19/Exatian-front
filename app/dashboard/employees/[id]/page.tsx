"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EmployeeForm from "@/components/employeeForm";
import employeeService from "@/services/employeeServices";
import { Employee } from "@/constants/constants";

const EditEmployee: React.FC = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();

    const [initialData, setInitialData] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const res = await employeeService.getById(Number(id));
                const emp = res.data;
                setInitialData(emp);
            } catch (err) {
                console.error("Error cargando empleado:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleUpdate = async (data: Employee) => {
        try {
            await employeeService.update(Number(id), data);
            alert("Empleado actualizado");
            router.push("/dashboard/employees");
        } catch (err) {
            console.error("Error actualizando:", err);
            alert("Error al actualizar empleado");
        }
    };

    if (loading) return <p>Cargando datos...</p>;
    if (!initialData) return <p>Empleado no encontrado.</p>;

    return (
        <div className="w-full h-full p-6 bg-gray-300 shadow text-[#1e293b]">
            <h1 className="text-3xl text-[#2A2A40] mb-5 font-semibold">Editar Empleado</h1>
            <EmployeeForm
                initialData={initialData}
                onSubmit={handleUpdate}
                isEditing
            />
        </div>
    );
};

export default EditEmployee;
