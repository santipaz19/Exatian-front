import React from 'react';

interface StatCardProps {
    label: string;
    value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
    return (
        <div className="bg-[#2A2A40] bg-gradient-to-b from-[#1E1E2F] to-[#343450] text-white rounded-xl shadow p-6 flex flex-col justify-between min-h-[120px] w-full hover:shadow-lg transition">
            <span className="text-sm uppercase ">{label}</span>
            <span className="text-3xl font-bold mt-2">{value}</span>
        </div>
    );
};

export default StatCard;
