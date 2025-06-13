
'use client'
import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface SidebarProps {
    items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botón hamburguesa visible solo en móvil */}
            <button
                className="sm:hidden absolute top-2 right-4 z-50 p-2 bg-[#1E1E2F] text-white rounded-md shadow-md"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Sidebar"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-full min-h-screen w-64 bg-[#1E1E2F] border-r border-black text-white p-4 transform
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static lg:block`}
            >
                <div className="mb-4 text-2xl font-bold border-b border-gray-700 pb-2">
                    AsistControl
                </div>
                <nav className="flex flex-col space-y-2">
                    {items.map(({ label, href, icon }, idx) => (
                        <Link
                            key={idx}
                            href={href}
                            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {icon && <span className="text-lg">{icon}</span>}
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Fondo semitransparente al abrir sidebar en móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default Sidebar;
