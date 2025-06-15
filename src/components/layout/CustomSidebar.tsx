
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  BarChart3, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  LogOut, 
  ClipboardList,
  Truck,
  Gauge  // Added Gauge icon for Cockpit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const CustomSidebar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (collapsed: boolean) => void }) => {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  // Check if we're in TFC or Supplier route
  const isTFC = useMatch('/tfc/*');
  const rolePrefix = isTFC ? '/tfc' : '/supplier';
  const roleName = isTFC ? 'TFC' : 'Supplier';

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  // Enhanced hover detection for left edge
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Detect hover near left edge (within 20px)
      if (e.clientX <= 20 && !isHoverOpen) {
        setIsHoverOpen(true);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHoverOpen, isMobile]);

  const handleSidebarMouseEnter = () => {
    if (!isMobile) {
      setIsHoverOpen(true);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (!isMobile) {
      setIsHoverOpen(false);
    }
  };

  // Determine if sidebar should be visible
  const shouldShowSidebar = isMobile ? isSidebarOpen : (isHoverOpen || !collapsed);

  const menuItems = [
    {
      title: 'Trade',
      icon: <LayoutGrid className="w-5 h-5" />,
      path: `${rolePrefix}/trades`,
    },
    ...(isTFC ? [
      {
        title: 'Purchase Orders',
        icon: <ClipboardList className="w-5 h-5" />,
        path: `${rolePrefix}/purchase-orders`,
      },
      {
        title: 'Dashboard',
        icon: <Truck className="w-5 h-5" />,
        path: `${rolePrefix}/avocado-imports`,
      },
      // {
      //   title: 'Dashboard',
      //   icon: <Truck className="w-5 h-5" />,
      //   path: `${rolePrefix}/dashboard`,
      // },
      // {
      //   title: 'Cockpit',
      //   icon: <Gauge className="w-5 h-5" />,
      //   path: `${rolePrefix}/cockpit`,
      // }
    ] : [
      {
        title: 'Orders',
        icon: <ClipboardList className="w-5 h-5" />,
        path: `${rolePrefix}/orders`,
      }
    ]),
    {
      title: 'KPIs',
      icon: <BarChart3 className="w-5 h-5" />,
      path: `${rolePrefix}/kpis`,
    },
    {
      title: 'Tracker',
      icon: <AlertCircle className="w-5 h-5" />,
      path: `${rolePrefix}/tracker`,
    },
  ];

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-background border-r transition-all duration-300 ease-in-out",
          {
            "w-64": shouldShowSidebar && !collapsed,
            "w-16": shouldShowSidebar && collapsed,
            "w-0 -translate-x-full": !shouldShowSidebar,
          }
        )}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {shouldShowSidebar && !collapsed && (
            <h1 className="text-xl font-semibold whitespace-nowrap">
              Avocado Trace
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={collapsed ? "mx-auto" : ""}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                  {
                    "bg-primary text-primary-foreground": isActive,
                    "hover:bg-accent hover:text-accent-foreground": !isActive,
                    "justify-center": collapsed,
                  }
                )
              }
            >
              {item.icon}
              {shouldShowSidebar && !collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn("w-full flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground", {
              "justify-center": collapsed,
            })}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {shouldShowSidebar && !collapsed && <span>Logout</span>}
          </Button>
          {
            shouldShowSidebar && !collapsed && (
              <div className="text-center mt-8 text-gray-500 text-sm">
                Made with ❤️ by <a href="https://www.linkedin.com/in/dharya-jasuja-63071a248/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Dharya Jasuja</a>
              </div>
            )
          }
        </div>
      </div>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
