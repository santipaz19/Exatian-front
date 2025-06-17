"use client"
import React from "react";


import EmployeeForm from "@/components/employeeForm";
import { useEmployees } from "@/hooks/useEmployees";


const CreateEmployee: React.FC = () => {

    const { createEmployee } = useEmployees()

    return (
        <div className="w-full h-full p-6 bg-gray-300 shadow text-white">
            <h1 className="text-3xl text-[#2A2A40] mb-5 font-semibold">Agregar Empleado</h1>
            <EmployeeForm onSubmit={createEmployee} />
        </div>
    );
};

export default CreateEmployee;
