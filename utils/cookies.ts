// Función para obtener el companyID de las cookies
export const getCompanyIdFromCookies = (): string | null => {
    const cookies = document.cookie.split(';');
    const companyIdCookie = cookies.find(cookie =>
        cookie.trim().startsWith('companyId=')
    );
    if (companyIdCookie) {
        console.log(companyIdCookie.split('=')[1].trim());

        return companyIdCookie.split('=')[1].trim();
    }

    return null;
};


export const setCompanyIdCookie = (companyId: string) => {
    document.cookie = `companyId=${companyId}; path=/; max-age=86400`; // 24 horas
};

export const deleteCompanyIdCookie = () => {
    document.cookie = 'companyId=; path=/; max-age=0';
};

