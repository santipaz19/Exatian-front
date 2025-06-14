import React from 'react';


const CardLanding: React.FC = () => {
    return (
        <div className=" md:block hidden">
            <div className="bg-white rounded-3xl shadow-2xl p-8 ">
                <div className="bg-gradient-to-br from-[#1E1E2F] to-indigo-800 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">

                        <span className="text-blue-100">Dashboard</span>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">

                                <span className="text-sm">Empleados Activos</span>
                            </div>
                            <div className="text-2xl font-bold">24</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/20 rounded-lg p-3">

                                <div className="text-lg font-semibold">8</div>
                                <div className="text-xs text-blue-100">Empleados Inctivos</div>
                            </div>
                            <div className="bg-white/20 rounded-lg p-3">

                                <div className="text-lg font-semibold">32</div>
                                <div className="text-xs text-blue-100">Total de empleados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardLanding;
