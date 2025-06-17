
'use client'
import { deleteCompanyIdCookie } from '@/utils/cookies';
import Link from 'next/link';
import React from 'react';


const ButtonLogOut: React.FC = ({ }) => {


    return (
        <Link href={"/"} onClick={() => deleteCompanyIdCookie()} className='px-4 py-2 bg-red-600 text-white rounded-lg mr-10 sm:mr-0' >
            Cerrar sesion </Link>
    );
};

export default ButtonLogOut;