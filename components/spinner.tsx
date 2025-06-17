
export const LoadingSpinner = () => (
    <div className="flex w-full h-full justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Cargando...</span>
    </div>
);