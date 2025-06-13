import React, { ReactNode } from 'react';

import Sidebar from '@/components/sidebar';
import { menuItems } from '@/constants/constants';


interface DashboardLayoutProps {
    children: ReactNode;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen min-w-full bg-gray-300">

            <Sidebar items={menuItems} />
            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="h-14 bg-[#FBBF24] shadow flex items-center border-b-1 px-6">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto ">
                    {children}
                </main>

            </div>
        </div>
    );
}
