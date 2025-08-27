'use client';

import { useState, useEffect } from 'react';
import { Page } from '@/components/PageLayout';
import { AuthButton } from '@/components/AuthButton';
import { Spinner, LogoPrincipal, Contador } from '@/components/utilidades/indexUtilidades';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial de la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de spinner
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Spinner />
      </div>
    );
  }

  return (
    <Page.Main className="flex flex-col justify-between min-h-screen p-6 gap-6">
      {/* Contenido principal */}
      <div className="flex flex-col items-center gap-6">
        <LogoPrincipal />
        <Contador />

        <h1 className="text-3xl font-bold text-indigo-600 mt-6">
          Wordcoin Dashboard
        </h1>
        <p className="text-gray-300 text-center max-w-md">
          Bienvenido a la plantilla de desarrollo de Wordcoin. Aquí podrás probar autenticación, pagos y gestión de usuarios.
        </p>

        <div className="w-full max-w-3xl mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4 text-center text-black">
            Próximo componente 1
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center text-black">
            Próximo componente 2
          </div>
        </div>
      </div>

      {/* Botón Auth al fondo */}
      <div className="mt-10 flex justify-center">
        <AuthButton className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-[0_0_10px_rgba(127,90,240,0.7)] hover:shadow-[0_0_20px_rgba(79,70,229,0.9)] transition-all duration-300 animate-pulse" />
      </div>
    </Page.Main>
  );
}
