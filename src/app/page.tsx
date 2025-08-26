// ===============================
// Home.tsx
// Página principal: plantilla para Wordcoin Dashboard
// ===============================

import { Page } from '@/components/PageLayout'; // Layout general de la página (Header, Main, Footer)
import { AuthButton } from '../components/AuthButton'; // Componente para login/logout con Wordcoin

export default function Home() {
  return (
    // Contenedor general de la página
    <Page className="bg-gray-50 min-h-screen">
      
      {/* ===============================
          Main central de la página
          - Centrado vertical y horizontal
          - Gap y padding para separación
      =============================== */}
      <Page.Main className="flex flex-col items-center justify-center gap-6 p-6">
        
        {/* ===============================
            Título principal
        =============================== */}
        <h1 className="text-3xl font-bold text-indigo-600">
          Wordcoin Dashboard
        </h1>

        {/* ===============================
            Subtítulo o descripción
            - Texto de bienvenida y contexto de la plantilla
        =============================== */}
        <p className="text-gray-700 text-center max-w-md">
          Bienvenido a la plantilla de desarrollo de Wordcoin. Aquí podrás probar autenticación, pagos y gestión de usuarios.
        </p>

        {/* ===============================
            Botón de autenticación
            - Usado para login/logout
            - Se puede reemplazar con lógica de Wordcoin
        =============================== */}
        <AuthButton className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition" />

        {/* ===============================
            Contenedor de widgets o componentes futuros
            - Grid responsive
            - Espacio para tarjetas o secciones
        =============================== */}
        <div className="w-full max-w-3xl mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            Próximo componente 1
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            Próximo componente 2
          </div>
        </div>

      </Page.Main>
    </Page>
  );
}
