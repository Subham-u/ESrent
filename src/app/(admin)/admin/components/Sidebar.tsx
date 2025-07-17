'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useApi';
import { 
  Car, 
  Tag, 
  BookOpen, 
  BarChart3, 
  Settings,
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Cars', href: '/admin/cars', icon: Car },
  { name: 'Brands', href: '/admin/brands', icon: BookOpen },
  { name: 'Categories', href: '/admin/categories', icon: Tag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' }); // optional, for completeness
      logout();
      setTimeout(() => {
        router.replace('/admin/login');
      }, 100); // 100ms delay to allow state to update
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-4 lg:p-6 border-b border-border">
        <h1 className="text-lg lg:text-xl font-bold text-card-foreground">ES Rental Admin</h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 lg:px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </div>
  );
}
