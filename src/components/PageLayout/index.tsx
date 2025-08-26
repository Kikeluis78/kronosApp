import clsx from 'clsx';
import { ReactNode, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * ================================
 * Page
 * Componente contenedor principal de la página
 * ================================
 */
export interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Page = ({ children, className, ...rest }: PageProps) => {
  // twMerge y clsx permiten combinar clases dinámicamente
  return (
    <div className={twMerge(clsx('flex h-dvh flex-col', className))} {...rest}>
      {children}
    </div>
  );
};

/**
 * ================================
 * Header
 * Encabezado de la página
 * ================================
 */
export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const Header = ({ children, className, ...rest }: PageHeaderProps) => {
  return (
    <header
      className={twMerge(
        'bg-white flex flex-col justify-center px-6 pt-6 pb-3 z-10',
        clsx(className),
      )}
      {...rest}
    >
      {children}
    </header>
  );
};

/**
 * ================================
 * Main
 * Contenedor principal del contenido
 * ================================
 */
export interface PageMainProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const Main = ({ children, className, ...rest }: PageMainProps) => {
  return (
    <main
      className={twMerge('grow overflow-y-auto p-6 pt-3', clsx(className))}
      {...rest}
    >
      {children}
    </main>
  );
};

/**
 * ================================
 * Footer
 * Pie de página
 * ================================
 */
export interface PageFooterProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const Footer = ({ children, className, ...rest }: PageFooterProps) => {
  return (
    <footer className={twMerge('px-6 pb-[35px]', clsx(className))} {...rest}>
      {children}
    </footer>
  );
};

// Asignación de subcomponentes al objeto Page
Page.Header = Header;
Page.Main = Main;
Page.Footer = Footer;
