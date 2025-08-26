'use client';
import { CircularIcon, Marble } from '@worldcoin/mini-apps-ui-kit-react';
import { CheckCircleSolid } from 'iconoir-react';
import { useSession } from 'next-auth/react';

/**
 * UserInfo Component
 * ------------------
 * Muestra información del usuario autenticado:
 * - Avatar (Marble)
 * - Username
 * - Icono de verificación si existe la imagen de perfil
 * 
 * Requiere renderizado en cliente (useSession de NextAuth)
 */
export const UserInfo = () => {
  // Obtenemos la sesión actual del usuario
  const session = useSession();

  return (
    <div className="flex flex-row items-center justify-start gap-4 rounded-xl w-full border-2 border-gray-200 p-4">
      {/* Avatar */}
      <Marble src={session?.data?.user?.profilePictureUrl} className="w-14" />

      {/* Nombre de usuario + icono de verificación */}
      <div className="flex flex-row items-center justify-center">
        <span className="text-lg font-semibold capitalize">
          {session?.data?.user?.username}
        </span>

        {/* Mostrar icono de verificación si hay avatar */}
        {session?.data?.user?.profilePictureUrl && (
          <CircularIcon size="sm" className="ml-0">
            <CheckCircleSolid className="text-blue-600" />
          </CircularIcon>
        )}
      </div>
    </div>
  );
};
