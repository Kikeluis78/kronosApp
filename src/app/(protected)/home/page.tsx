import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { Pay } from '@/components/Pay';
import { Transaction } from '@/components/Transaction';
import { UserInfo } from '@/components/UserInfo';
import { Verify } from '@/components/Verify';
import { ViewPermissions } from '@/components/ViewPermissions';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default async function Home() {
  const session = await auth();

  return (
    <>
      {/* Header con TopBar */}
      <Page.Header className="p-0">
        <TopBar
          title="Dashboard"
          className="bg-gradient-to-r from-purple-600 to-indigo-500 shadow-md"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize text-white">
                {session?.user.username}
              </p>
              <Marble src={session?.user.profilePictureUrl} className="w-12" />
            </div>
          }
        />
      </Page.Header>

      {/* Main content */}
      <Page.Main className="flex flex-col items-center gap-6 mb-16 w-full max-w-4xl px-4">
        {/* Título de la sección */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido a tu Mini App</h1>

        {/* Bloques tipo card */}
        <div className="w-full p-4 bg-white rounded-xl shadow-lg">
          <UserInfo />
        </div>
        <div className="w-full p-4 bg-white rounded-xl shadow-lg">
          <Verify />
        </div>
        <div className="w-full p-4 bg-white rounded-xl shadow-lg">
          <Pay />
        </div>
        <div className="w-full p-4 bg-white rounded-xl shadow-lg">
          <Transaction />
        </div>
        <div className="w-full p-4 bg-white rounded-xl shadow-lg">
          <ViewPermissions />
        </div>
      </Page.Main>
    </>
  );
}
