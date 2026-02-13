'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardNavbar } from '@/components/dashboard/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden relative bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex relative z-10">
        <DashboardSidebar />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64 backdrop-blur-xl bg-white/90 border-white/20">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col relative z-10">
        {/* Navbar */}
        <div className='flex w-full justify-between items-center lg:justify-end backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm px-4 lg:px-0 h-16'>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className='lg:hidden'
          >
            <Menu className="h-5 w-5" />
          </Button>
          <DashboardNavbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
