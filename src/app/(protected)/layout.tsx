// ===============================
// TabsLayout.tsx
// Layout para pestañas con footer fijo y navegación
// ===============================

import { auth } from '@/auth'; // Función para obtener la sesión del usuario
import { Navigation } from '@/components/Navigation'; // Componente del footer de navegación
import { Page } from '@/components/PageLayout'; // Layout de página (Header, Main, Footer)

// -------------------------------
// Props tipadas para TabsLayout
// -------------------------------
interface TabsLayoutProps {
  children: React.ReactNode; // Contenido de las páginas hijas
}

// ================================
// TabsLayout
// Contenedor para páginas con tabs y footer fijo
// ================================
export default async function TabsLayout({ children }: TabsLayoutProps) {
  // -------------------------------
  // Obtener sesión del usuario
  // session contiene datos como username, avatar, etc.
  // -------------------------------
  const session = await auth();

  // -------------------------------
  // Si el usuario no está autenticado
  // - Redirigir al login (aquí está comentado)
  // -------------------------------
  if (!session) {
    console.log('Not authenticated');
    // redirect('/'); // Descomentar para redirección real
  }

  return (
    <Page className="bg-gray-50 min-h-screen">
      {/* ================================
          Contenido principal
          - pb-20 para dejar espacio al footer fijo
      ================================ */}
      <div className="pb-20">{children}</div>

      {/* ================================
          Footer fijo
          - Contiene la navegación
          - bg-white, borde superior y sombra
      ================================ */}
      <Page.Footer className="px-4 py-2 fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md">
        <Navigation />
      </Page.Footer>
    </Page>
  );
}
