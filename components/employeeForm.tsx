'use client';
import { Employee } from '@/constants/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface EmployeeFormProps {
    initialData?: Employee;
    onSubmit: (data: Employee) => Promise<void>;
    isEditing?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    initialData,
    onSubmit,
    isEditing = false,
}) => {
    const [formData, setFormData] = useState<Employee>({
        fullName: '',
        dni: '',
        email: '',
        position: '',
        hireDate: '',
        isActive: false,
    });

    const router = useRouter()

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                hireDate: initialData.hireDate?.slice(0, 10) || '',
                isActive: Boolean(initialData.isActive),
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
        router.push("/dashboard/employees")
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#1e293b] mb-6">
                {isEditing ? 'Editar datos' : 'Ingresar datos'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#374151]">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Ingresa el nombre completo"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] placeholder-[#64748b] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#374151]">
                            DNI
                        </label>
                        <input
                            type="text"
                            name="dni"
                            placeholder="Ingresa el DNI"
                            value={formData.dni}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] placeholder-[#64748b] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#374151]">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] placeholder-[#64748b] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#374151]">
                            Puesto
                        </label>
                        <input
                            type="text"
                            name="position"
                            placeholder="Ingresa el puesto"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] placeholder-[#64748b] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#374151]">
                            Fecha de contratación
                        </label>
                        <input
                            type="date"
                            name="hireDate"
                            value={formData.hireDate}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200"
                        />
                    </div>
                </div>


                <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={Boolean(formData.isActive)}
                        onChange={handleChange}
                        id="isActive"
                        className="w-4 h-4 text-[#3b82f6] bg-white border-[#d1d5db] rounded focus:ring-[#3b82f6] focus:ring-2"
                    />
                    <label htmlFor="isActive" className="text-[#374151] font-medium cursor-pointer">
                        Empleado activo
                    </label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className={`flex-1 h-12 rounded-lg text-white font-medium transition-all cursor-pointer duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-opacity-50 ${isEditing
                            ? 'bg-[#10b981] hover:bg-[#059669] focus:ring-[#10b981]'
                            : 'bg-[#3b82f6] hover:bg-[#2563eb] focus:ring-[#3b82f6]'
                            }`}
                    >
                        {isEditing ? 'Actualizar Empleado' : 'Crear Empleado'}
                    </button>

                    <Link
                        href="/dashboard/employees"
                        className="flex-1 h-12 flex items-center justify-center rounded-lg text-white font-medium bg-[#ef4444] hover:bg-[#dc2626] transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-[#ef4444] focus:ring-opacity-50"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;