'use client';

import { ListItem } from '@worldcoin/mini-apps-ui-kit-react';
import { MiniKit } from '@worldcoin/minikit-js';
import { useMiniKit } from '@worldcoin/minikit-js/minikit-provider';
import { useEffect, useState } from 'react';

/**
 * ViewPermissions Component
 * -------------------------
 * Este componente permite visualizar los permisos del usuario en MiniKit.
 * Debe ejecutarse en el cliente porque los comandos de MiniKit solo funcionan en componentes cliente.
 * 
 * Documentación: https://docs.world.org/mini-apps/commands/permissions
 */
export const ViewPermissions = () => {
  // Estado para almacenar los permisos del usuario
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  // Hook para verificar si MiniKit está instalado en el navegador
  const { isInstalled } = useMiniKit();

  // useEffect para obtener los permisos al montar el componente
  useEffect(() => {
    const fetchPermissions = async () => {
      if (isInstalled) {
        try {
          // Obtener permisos mediante MiniKit
          // También se puede acceder directamente desde MiniKit.user.permissions
          const permissionsResult = await MiniKit.commandsAsync.getPermissions();

          if (permissionsResult?.finalPayload.status === 'success') {
            // Guardar permisos en el estado
            setPermissions(permissionsResult?.finalPayload.permissions || {});
            console.log('permissions', permissionsResult);
          }
        } catch (error) {
          console.error('Failed to fetch permissions:', error);
        }
      } else {
        console.log('MiniKit is not installed');
      }
    };

    fetchPermissions();
  }, [isInstalled]);

  return (
    <div className="grid w-full gap-4">
      {/* Título del componente */}
      <p className="text-lg font-semibold">Permissions</p>

      {/* Renderiza cada permiso usando ListItem */}
      {permissions &&
        Object.entries(permissions).map(([permission, value]) => (
          <ListItem
            key={permission}
            label={permission} // Nombre del permiso
            description={`Enabled: ${value}`} // Estado del permiso
          />
        ))}
    </div>
  );
};
