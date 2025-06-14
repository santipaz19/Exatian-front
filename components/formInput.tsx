import React from 'react';

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    className = '',
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-[#374151]">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full h-12 px-4 rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] placeholder-[#64748b] focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200"
            />
        </div>
    );
};