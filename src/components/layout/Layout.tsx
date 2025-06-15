
import { ReactNode } from 'react';
import { CustomSidebar } from './CustomSidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <CustomSidebar />
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};
