
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
  const [isOpen, setIsOpen] = useState(false);

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
      // Open sidebar when hovering near left edge (within 50px)
      if (e.clientX <= 50 && !isOpen) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    // Add mouse move listener to detect hover near left edge
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, isOpen]);

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
            "w-64 translate-x-0": isOpen,
            "w-64 -translate-x-full": !isOpen,
          }
        )}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        <div className="p-4 flex items-center border-b">
          <h1 className="text-xl font-semibold whitespace-nowrap">
            Avocado Trace
          </h1>
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
                  }
                )
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
          <div className="text-center mt-8 text-gray-500 text-sm">
            Made with ❤️ by <a href="https://www.linkedin.com/in/dharya-jasuja-63071a248/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Dharya Jasuja</a>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
