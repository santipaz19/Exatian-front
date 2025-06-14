import React from 'react';

interface StatCardProps {
    label: string;
    value: number | string;
}

const HomeCards: React.FC<StatCardProps> = ({ label, value }) => {
    return (
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{label}</h3>
            <p className="text-gray-600">
                {value}
            </p>
        </div>
    );
};

export default HomeCards;
