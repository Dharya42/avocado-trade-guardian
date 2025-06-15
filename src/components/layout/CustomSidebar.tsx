
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  BarChart3, 
  AlertCircle, 
  LogOut, 
  ClipboardList,
  Truck,
  Gauge
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";

export const CustomSidebar = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if we're in TFC or Supplier route
  const isTFC = useMatch('/tfc/*');
  const rolePrefix = isTFC ? '/tfc' : '/supplier';

  const handleLogout = () => {
    navigate('/');
  };

  // Handle mouse events for hover behavior
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Expand sidebar when hovering near left edge (within 70px to account for collapsed width)
      if (e.clientX <= 70 && !isExpanded) {
        setIsExpanded(true);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, isExpanded]);

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
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-background border-r transition-all duration-300 ease-in-out",
          {
            "w-64": isExpanded,
            "w-16": !isExpanded,
          }
        )}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        <div className="p-4 flex items-center border-b min-h-[60px]">
          {isExpanded ? (
            <h1 className="text-xl font-semibold whitespace-nowrap">
              Avocado Trace
            </h1>
          ) : (
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  {
                    "bg-primary text-primary-foreground": isActive,
                    "hover:bg-accent hover:text-accent-foreground": !isActive,
                    "justify-center": !isExpanded,
                    "space-x-2": isExpanded,
                  }
                )
              }
            >
              {item.icon}
              {isExpanded && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center hover:bg-accent hover:text-accent-foreground",
              {
                "w-full space-x-2": isExpanded,
                "w-8 h-8 p-0 justify-center": !isExpanded,
              }
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {isExpanded && <span>Logout</span>}
          </Button>
          {isExpanded && (
            <div className="text-center mt-8 text-gray-500 text-sm">
              Made with ❤️ by <a href="https://www.linkedin.com/in/dharya-jasuja-63071a248/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Dharya Jasuja</a>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is expanded */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};
