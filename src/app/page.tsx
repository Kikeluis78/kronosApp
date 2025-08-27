// ===============================
// Home.tsx
// Página principal: plantilla para Wordcoin Dashboard
// ===============================

import { Page } from '@/components/PageLayout';
import { AuthButton } from '../components/AuthButton';
import { Spinner, LogoPrincipal, Contador } from '@/components/utilidades/IndexUtilidades';

export default function Home() {
  return (
    <Page className="bg-black min-h-screen text-white">
      
      {/* ===============================
          Header / Menú principal
      =============================== */}
      <div className="flex justify-between items-center p-4 border-b border-indigo-500 neon-glow">
        <nav className="space-x-4">
          <button className="hover:text-indigo-400 transition">Reclamar</button>
          <button className="hover:text-indigo-400 transition">Compartir</button>
          <button className="hover:text-indigo-400 transition">Acerca de</button>
        </nav>
      </div>

      {/* ===============================
          Contenido principal
      =============================== */}
      <Page.Main className="flex flex-col items-center justify-center gap-6 p-6">
        <LogoPrincipal />
        <Contador />
        <Spinner />

        {/* Título principal */}
        <h1 className="text-3xl font-bold text-indigo-600 mt-6">
          Wordcoin Dashboard
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-300 text-center max-w-md">
          Bienvenido a la plantilla de desarrollo de Wordcoin. Aquí podrás probar autenticación, pagos y gestión de usuarios.
        </p>

        {/* Botón de autenticación */}
        <AuthButton className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition" />

        {/* Espacio para futuros widgets */}
        <div className="w-full max-w-3xl mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4 text-center text-black">
            Próximo componente 1
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center text-black">
            Próximo componente 2
          </div>
        </div>
      </Page.Main>
    </Page>
  );
}
