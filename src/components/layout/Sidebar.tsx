
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Clock, 
  Settings, 
  Menu, 
  X,
  PlusCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const mainMenuItems = [
    {
      title: 'Calendar',
      path: '/',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: 'Clients',
      path: '/clients',
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: 'Cases',
      path: '/cases',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: 'Schedule',
      path: '/schedule',
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  const secondaryMenuItems = [
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  if (isMobile && !isOpen) {
    return (
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 rounded-full p-2 text-advocate hover:bg-advocate hover:text-white"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <>
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={toggleSidebar}
        />
      )}
      
      <aside
        className={cn(
          "flex flex-col h-screen bg-sidebar text-white fixed z-50 transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20",
          isMobile && (isOpen ? "left-0" : "-left-full"),
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
            <div className="p-1 rounded-lg bg-advocate-accent/20">
              <BookOpen className="h-8 w-8 text-advocate-accent" />
            </div>
            {isOpen && <h1 className="ml-3 text-xl font-serif">Advocate</h1>}
          </div>
          {(!isMobile || isOpen) && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground hover:bg-sidebar-primary"
              onClick={toggleSidebar}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-8">
            <Button 
              className={cn(
                "w-full bg-advocate-accent hover:bg-advocate-accent/90 text-advocate transition-all", 
                !isOpen && "p-2 aspect-square"
              )}
            >
              <PlusCircle className="h-5 w-5" />
              {isOpen && <span className="ml-2">New Appointment</span>}
            </Button>
          </div>
          
          <ul className="space-y-1 px-3">
            {mainMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-2 px-3 rounded-md transition-colors",
                      isActive ? "bg-sidebar-primary text-white" : "text-sidebar-foreground hover:bg-sidebar-primary/50",
                      !isOpen && "justify-center px-2"
                    )
                  }
                >
                  {item.icon}
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <div className="px-6 mb-2">
              {isOpen && <h6 className="text-xs uppercase font-semibold text-sidebar-foreground/60">System</h6>}
            </div>
            <ul className="space-y-1 px-3">
              {secondaryMenuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center py-2 px-3 rounded-md transition-colors",
                        isActive ? "bg-sidebar-primary text-white" : "text-sidebar-foreground hover:bg-sidebar-primary/50",
                        !isOpen && "justify-center px-2"
                      )
                    }
                  >
                    {item.icon}
                    {isOpen && <span className="ml-3">{item.title}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div 
            className={cn(
              "flex items-center cursor-pointer text-sidebar-foreground hover:text-white transition-colors",
              !isOpen && "justify-center"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-advocate-accent/20 flex items-center justify-center text-advocate-accent font-semibold">
              JD
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs opacity-70">Senior Advocate</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
