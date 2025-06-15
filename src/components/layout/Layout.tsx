
import { ReactNode, useState } from 'react';
import { CustomSidebar } from './CustomSidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(true); // Start collapsed by default
  
  return (
    <div className="flex h-screen bg-background">
      <CustomSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};
