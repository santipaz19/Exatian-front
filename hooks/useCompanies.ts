'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Company } from '@/constants/constants';
import companiesService from '@/services/ccompaniesServices';

export function useCompanies() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        try {
            const res = await companiesService.getAll();
            setCompanies(res.data.data);
        } catch (err) {
            console.error('Error cargando empleados:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const createCompanies = async (data: Company) => {
        await companiesService.create(data);
        await fetchCompanies();
    };

    const updateCompanies = async (id: number, data: any) => {
        await companiesService.update(id, data);
        await fetchCompanies();
    };

    const deleteCompanies = async (id: number) => {
        await companiesService.delete(id);
        await fetchCompanies();
    };


    return {
        companies,
        loading,
        createCompanies,
        updateCompanies,
        deleteCompanies,
        fetchCompanies,
    };
}
