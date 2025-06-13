"use client"
import React from "react";

import employeeService from "@/services/employeeServices";
import { Employee } from "@/constants/constants";
import EmployeeForm from "@/components/employeeForm";

const CreateEmployee: React.FC = () => {

    const handleCreate = async (data: Employee) => {
        try {
            const res = await employeeService.create(data);
            if (!res) throw new Error("Error al crear el empleado");
            alert("Empleado creado correctamente");
        } catch (error) {
            alert("Hubo un error al crear el empleado");
            console.error(error);
        }
    };

    return (
        <div className="w-full h-full p-6 bg-gray-300 shadow text-white">
            <h1 className="text-3xl text-[#2A2A40] mb-5 font-semibold">Agregar Empleado</h1>
            <EmployeeForm onSubmit={handleCreate} />
        </div>
    );
};

export default CreateEmployee;
