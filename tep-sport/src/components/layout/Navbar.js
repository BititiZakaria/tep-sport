'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPrestations, setShowPrestations] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // If we are in the admin pages, we don't display the public navbar
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) return null;

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Le centre', href: '/le-centre' },
    { name: 'Abonnements', href: '/abonnements' },
    { name: 'Événements', href: '/evenements' },
    { name: 'Boutique', href: '/boutique' },
  ];

  const prestations = [
    { name: 'Préparation Physique', href: '/preparation-physique' },
    { name: 'Récupération', href: '/recuperation' },
    { name: 'Cours Collectifs', href: '/cours-collectifs' },
    { name: 'Padel', href: '/padel' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/85 border-b border-white/10 py-3 backdrop-blur-md' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-50">
          <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600">
            TEP SPORT
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 border border-white/20 rounded px-1.5 py-0.5 ml-1">
            Centre
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/' ? 'text-cyan-400' : 'text-white/90'}`}
          >
            Accueil
          </Link>
          <Link 
            href="/le-centre" 
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/le-centre' ? 'text-cyan-400' : 'text-white/90'}`}
          >
            Le centre
          </Link>

          {/* Prestations Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowPrestations(true)}
            onMouseLeave={() => setShowPrestations(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-cyan-400 ${
              prestations.some(p => pathname === p.href) ? 'text-cyan-400' : 'text-white/90'
            }`}>
              Prestations <ChevronDown size={14} className={`transition-transform duration-200 ${showPrestations ? 'rotate-180' : ''}`} />
            </button>
            
            {showPrestations && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 p-2 shadow-2xl animate-fade-in-up duration-200">
                {prestations.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors hover:bg-white/10 hover:text-cyan-400 ${
                      pathname === item.href ? 'text-cyan-400 bg-white/5' : 'text-white/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/abonnements" 
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/abonnements' ? 'text-cyan-400' : 'text-white/90'}`}
          >
            Abonnements
          </Link>
          <Link 
            href="/evenements" 
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/evenements' ? 'text-cyan-400' : 'text-white/90'}`}
          >
            Événements
          </Link>
          <Link 
            href="/boutique" 
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/boutique' ? 'text-cyan-400' : 'text-white/90'}`}
          >
            Boutique
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden xl:flex items-center gap-4">
          <Link href="/reserver" className="btn-primary py-2 px-5 text-sm font-semibold">
            Réserver
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                className="flex items-center gap-2 text-sm text-white/90 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-full py-1.5 px-4 border border-white/10 transition-all"
              >
                <User size={16} className="text-cyan-400" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="p-2 text-white/60 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-full transition-all"
                title="Se déconnecter"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link 
              href="/client/login" 
              className="inline-flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/15 text-white w-10 h-10 rounded-full transition-all hover:scale-105"
              title="Espace membre"
            >
              <User size={18} />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="xl:hidden p-2 text-white hover:text-cyan-400 transition-colors z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 flex flex-col p-8 pt-24 animate-fade-in-up">
            <div className="flex flex-col gap-5 text-lg font-medium">
              <Link 
                href="/" 
                className={`py-2 border-b border-white/5 ${pathname === '/' ? 'text-cyan-400' : 'text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                href="/le-centre" 
                className={`py-2 border-b border-white/5 ${pathname === '/le-centre' ? 'text-cyan-400' : 'text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                Le centre
              </Link>
              
              {/* Prestations expander in Mobile */}
              <div className="flex flex-col">
                <span className="py-2 text-white/50 text-sm uppercase tracking-wider font-bold">Prestations</span>
                <div className="pl-4 flex flex-col gap-3 mt-2 border-l border-white/10">
                  {prestations.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-base ${pathname === item.href ? 'text-cyan-400' : 'text-white/80'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/abonnements" 
                className={`py-2 border-b border-white/5 ${pathname === '/abonnements' ? 'text-cyan-400' : 'text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                Abonnements
              </Link>
              <Link 
                href="/evenements" 
                className={`py-2 border-b border-white/5 ${pathname === '/evenements' ? 'text-cyan-400' : 'text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                Événements
              </Link>
              <Link 
                href="/boutique" 
                className={`py-2 border-b border-white/5 ${pathname === '/boutique' ? 'text-cyan-400' : 'text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                Boutique
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="mt-auto flex flex-col gap-4">
              <Link 
                href="/reserver" 
                className="btn-primary w-full text-center py-3"
                onClick={() => setIsOpen(false)}
              >
                Réserver
              </Link>
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link 
                    href={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                    className="w-full text-center bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-full flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} className="text-cyan-400" />
                    <span>Espace de {user.name}</span>
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full text-center bg-red-950/20 border border-red-500/20 text-red-400 py-3 rounded-full"
                  >
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <Link 
                  href="/client/login" 
                  className="w-full text-center bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-full flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  <span>Connexion Espace Membre</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
