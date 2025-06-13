// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          AsistControl - Control de Ingresos y Egresos
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Gestioná fácilmente tus empleados, el registro de entradas y salidas de tu personal. Visualizá y controlá los horarios de forma clara y organizada.
        </p>
        <Link href="/dashboard">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg transition">
            Ir al Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
}
