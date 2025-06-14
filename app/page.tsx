import CardLanding from '@/components/cardLanding';
import HomeCards from '@/components/homeCards';
import Link from 'next/link';


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className=" overflow-hidden bg-gradient-to-r from-blue-600/10 to-indigo-600/10 ">

        <div className="grid lg:grid-cols-2 gap-12 items-center  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-[#1E1E2F]">AsistControl</span>
                <br />Control Total de Personal
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                La solución más completa para gestionar empleados, registrar entradas y salidas,
                y mantener un control preciso de la asistencia de tu equipo.
              </p>
            </div>


            <Link className='w-full justify-center flex md:justify-start' href="/dashboard">
              <button className="bg-[#1E1E2F] cursor-pointer hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Comenzar Ahora
              </button>
            </Link>


            <div className="flex items-center space-x-6 md:pt-0 pt-5 text-sm text-gray-500">
              <span>Fácil configuración</span>
              <span>Sin instalación compleja</span>
              <span>Responsive</span>
            </div>
          </div>
          <CardLanding />
        </div>

      </section >

      {/* Features Section */}
      < section className="py-20  bg-gradient-to-r from-[#1E1E2F] to-indigo-900" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Todo lo que necesitás en una sola plataforma
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Desde la gestión de empleados hasta el control de asistencia,
              AsistControl te ofrece todas las herramientas para administrar tu equipo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <HomeCards label='Vista en Tiempo Real' value='Conocé quién está trabajando en este momento.Lista actualizada de empleados activos.' />
            <HomeCards label='Fácil de Usar' value='Interfaz intuitiva y responsive. Accedé desde cualquier dispositivo sin complicaciones.' />
            <HomeCards label='Datos Seguros' value='Base de datos SQLite local que garantiza la seguridad y privacidad de tu información.' />
            <HomeCards label='Historial Completo' value='Accedé al historial personal y general. Visualizá patrones y tomá decisiones informadas.' />
            <HomeCards label='Control de Asistencia' value='Registrá entradas y salidas con validaciones inteligentes. Evitá duplicados y registros inconsistentes.' />
            <HomeCards label='Gestión de Empleados' value='Creá, editá y eliminá empleados fácilmente. Mantené toda la información organizada y actualizada.' />
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="py-20 bg-gray-50" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para transformar tu gestión de personal?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Comenzá hoy mismo y experimentá la diferencia de tener un control total
            sobre la asistencia de tu equipo.
          </p>
          <Link href="/dashboard">
            <button className="bg-[#1E1E2F] cursor-pointer hover:bg-blue-700 text-white px-12 py-4 rounded-xl text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Empezar
            </button>
          </Link>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-900 text-white py-12" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">AsistControl</h3>
            <p className="text-gray-400 mb-4">
              La solución completa para el control de asistencia empresarial.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 AsistControl. Desarrollado por Santiago Paz, Desafio Exactian
            </p>
          </div>
        </div>
      </footer >
    </main >
  );
}