'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, LayoutDashboard, Calendar, Users, Mail, Dumbbell, 
  LogOut, Menu, X, ArrowLeft
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // If not loading and no admin user, redirect to admin login
    // Don't redirect if already on login page
    if (!loading && (!user || user.role !== 'admin') && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, pathname, router]);

  // If on login page, render without sidebar layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Réservations Padel', href: '/admin/reservations', icon: <Calendar size={18} /> },
    { name: 'Utilisateurs', href: '/admin/users', icon: <Users size={18} /> },
    { name: 'Service Mailing', href: '/admin/mailing', icon: <Mail size={18} /> },
    { name: 'Séances Coaching', href: '/admin/seances', icon: <Dumbbell size={18} /> },
    { name: 'Calendrier global', href: '/admin/calendrier', icon: <Calendar size={18} /> }
  ];

  return (
    <div className="min-h-screen flex text-white relative">
      
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-black/90 border-b border-white/10 px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <Shield className="text-cyan-400" size={20} />
          <span className="font-extrabold tracking-wider text-sm">TEP ADMIN</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white hover:text-cyan-400 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar (Desktop + Mobile overlay) */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''} h-screen flex flex-col justify-between p-6`}>
        <div className="space-y-8">
          {/* Logo & Header */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Shield className="text-cyan-400" size={28} />
            <div>
              <h2 className="font-black text-lg tracking-wider text-white">TEP SPORT</h2>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Administration</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold text-white/50 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} /> Retour au site public
          </Link>
          <button
            onClick={() => { logout(); router.push('/admin/login'); }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="admin-content flex-1 pt-24 lg:pt-8 bg-black/10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
