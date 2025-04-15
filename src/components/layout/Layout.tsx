
import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`flex-1 transition-all duration-300 p-6 overflow-y-auto ${collapsed ? 'ml-16' : 'ml-64'}`}>
        {children}
      </main>
    </div>
  );
};
