
import companiesService from '@/services/ccompaniesServices';
import { setCompanyIdCookie } from '@/utils/cookies';
import React, { useState } from 'react';
import { FormInput } from './formInput';
import CustomButton from './button';

interface CompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // petición de login al servicio
            const response = await companiesService.login({ email: formData.email, password: formData.password });


            if (response && response.data.success) {
                // establece la cookie con el ID de la compañía desde la respuesta
                setCompanyIdCookie(String(response.data.data.id));
                onClose();

                // ejecuta el router al dashboard
                onLoginSuccess();
            }
        } catch (error) {
            console.log('Error durante el login:', error);
            setError('Credenciales incorrectas. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-[#10101b] to-[#2A2A40] text-[#10101b] bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold  mb-2">Iniciar Sesión</h2>
                <p className="text-[#10101b] mb-6">Ingresa tus credenciales para continuar</p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <FormInput
                        label="Email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        type='email'
                    />
                    <FormInput
                        label="Contraseña"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        type='password'
                        onChange={handleInputChange}
                        required
                    />
                    <CustomButton
                        text='Iniciar Sesión'
                        color="blue"
                        disabled={isLoading || !formData.email || !formData.password}
                        type='submit'
                        className='w-full disabled:cursor-not-allowed'
                    />
                    <CustomButton
                        text='Cancelar'
                        disabled={isLoading}
                        onClick={onClose}
                        className='w-full bg-gray-500'
                    />
                </form>


            </div>
        </div>
    ) : null;
};

export default CompanyModal;