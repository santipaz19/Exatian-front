import React from 'react';

interface CustomButtonProps {
    text: string;
    color?: 'green' | 'red' | 'blue' | 'gray' | 'yellow';
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean
    className?: string
}

const colorMap = {
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, color = 'blue', onClick, type = 'button', disabled, className }) => {
    const buttonClass = `${colorMap[color]} cursor-pointer text-white h-fit py-2 px-6 rounded-lg transition ${className} `;

    return (
        <button
            onClick={onClick}
            className={buttonClass}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default CustomButton;