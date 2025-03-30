
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex bg-background">
      <Sidebar />
      <div className={cn("flex-1 flex flex-col", isMobile ? "ml-0" : "ml-64", "relative")}>
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
