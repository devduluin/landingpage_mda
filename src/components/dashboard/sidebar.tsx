'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Car,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Leads',
    href: '/dashboard/leads',
    icon: UserPlus,
  },
  {
    title: 'Partner Registrations',
    href: '/dashboard/partner-registrations',
    icon: Car,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col backdrop-blur-xl bg-white/70 border-r border-white/20 shadow-lg">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-white/20 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image 
            src="/MDAP_LOGO.svg" 
            alt="MDA Partner Logo" 
            width={120} 
            height={40}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30'
                  : 'text-gray-700 hover:bg-white/50 hover:text-orange-600'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/20 p-4">
        <div className="text-xs text-gray-600">
          © 2026 MDA Partner
        </div>
      </div>
    </div>
  );
}
