
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, BarChart3, AlertCircle, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';

export const CustomSidebar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (collapsed: boolean) => void }) => {
  const { isMobile } = useMobile();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const menuItems = [
    {
      title: 'Trade',
      icon: <LayoutGrid className="w-5 h-5" />,
      path: '/',
    },
    {
      title: 'KPIs',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/kpis',
    },
    {
      title: 'Tracker',
      icon: <AlertCircle className="w-5 h-5" />,
      path: '/tracker',
    },
  ];

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-card border-r shadow-sm transition-all duration-300",
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : collapsed
            ? "w-16"
            : "w-64"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-bold truncate">Avocado Trace</h2>
          )}
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-1.5 rounded-md hover:bg-muted",
              collapsed && "mx-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-x-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  isActive && "bg-accent/60 text-accent-foreground",
                  collapsed && "justify-center"
                )
              }
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className={cn(
            "flex items-center", 
            collapsed ? "justify-center" : "gap-2"
          )}>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-semibold">
              A
            </div>
            {!collapsed && <span className="font-medium">Avocado QC</span>}
          </div>
        </div>
      </div>
    </>
  );
};
