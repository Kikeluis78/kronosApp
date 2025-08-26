'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import { Bank, Home, User } from 'iconoir-react';
import { useState } from 'react';

/**
 * Componente Navigation
 * - Barra de navegación inferior para Mini Apps
 * - Muestra pestañas: Home, Wallet y Profile
 * - Mobile-first: pensada para diseño en dispositivos móviles
 * - Más info: https://docs.world.org/mini-apps/design/app-guidelines#mobile-first
 */
export const Navigation = () => {
  // Estado local para saber qué tab está activo
  const [value, setValue] = useState('home');

  return (
    <Tabs value={value} onValueChange={setValue}>
      {/* Tab Home */}
      <TabItem
        value="home"
        icon={<Home />}
        label="Home"
      />

      {/* Tab Wallet - por ahora solo de muestra */}
      <TabItem
        value="wallet"
        icon={<Bank />}
        label="Wallet"
      />

      {/* Tab Profile - por ahora solo de muestra */}
      <TabItem
        value="profile"
        icon={<User />}
        label="Profile"
      />
    </Tabs>
  );
};
