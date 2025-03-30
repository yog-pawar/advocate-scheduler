
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TopBar = () => {
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-white">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients, cases, or documents..."
            className="pl-9 bg-muted/50 border-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative" size="icon">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-advocate-accent text-advocate text-xs flex items-center justify-center">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer">
                <div className="flex justify-between w-full">
                  <span className="font-medium text-sm">Hearing Reminder</span>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <p className="text-sm mt-1">Upcoming hearing for Smith vs. State at Supreme Court tomorrow at 10:30 AM.</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer">
                <div className="flex justify-between w-full">
                  <span className="font-medium text-sm">Client Meeting</span>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
                <p className="text-sm mt-1">James Wilson has requested a meeting for legal consultation on Friday.</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
