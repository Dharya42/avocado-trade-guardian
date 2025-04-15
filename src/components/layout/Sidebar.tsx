
import { Link, useLocation } from 'react-router-dom';
import { Package, BarChart2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from 'react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    {
      name: 'Trade',
      path: '/',
      icon: <Package className="h-5 w-5" />
    },
    {
      name: 'KPIs',
      path: '/kpis',
      icon: <BarChart2 className="h-5 w-5" />
    }
  ];

  return (
    <div className={cn(
      "flex flex-col w-64 bg-sidebar transition-all duration-300 border-r border-sidebar-border h-screen fixed left-0 top-0",
      collapsed && "w-16"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && <h1 className="text-xl font-bold text-avocado-700">Avo Guardian</h1>}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md",
                  location.pathname === item.path 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  collapsed && "justify-center"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-4">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground">
        {!collapsed && (
          <div className="text-center">
            <p>Avocado Trade Guardian</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
};
