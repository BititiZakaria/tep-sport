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

  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdminPage) return null;

  const navLinks = [
    { name: 'Accueil',       href: '/' },
    { name: 'Le centre',     href: '/le-centre' },
    { name: 'Abonnements',   href: '/abonnements' },
    { name: 'Événements',    href: '/evenements' },
    { name: 'Boutique',      href: '/boutique' },
  ];

  const prestations = [
    { name: 'Préparation Physique', href: '/preparation-physique' },
    { name: 'Récupération',         href: '/recuperation' },
    { name: 'Cours Collectifs',     href: '/cours-collectifs' },
    { name: 'Padel',                href: '/padel' },
  ];

  const isActive = (href) => pathname === href;
  const isPrestationActive = prestations.some(p => pathname === p.href);

  // ── Shared styles ──
  const linkStyle = (active) => ({
    fontSize: '0.92rem',
    fontWeight: 500,
    textDecoration: 'none',
    color: active ? '#06B6D4' : 'rgba(255,255,255,0.88)',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
        transition: 'background 0.35s ease, border-bottom-color 0.35s ease, backdrop-filter 0.35s ease, padding 0.3s ease',
        background: isScrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        padding: isScrolled ? '0.8rem 0' : '1.2rem 0',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Heartbeat + runner SVG mark (simplified, mimic real logo) */}
            <svg width="48" height="36" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Heartbeat line */}
              <polyline points="2,22 10,22 14,10 18,34 22,18 26,26 30,22 38,22" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              {/* Runner silhouette */}
              <circle cx="50" cy="10" r="4" fill="#06B6D4"/>
              <line x1="50" y1="14" x2="47" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="50" y1="14" x2="53" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="47" y1="24" x2="44" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="47" y1="24" x2="50" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="48" y1="18" x2="55" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.01em',
                background: 'linear-gradient(135deg, #ffffff 40%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                TEP<span style={{ color: '#06B6D4', WebkitTextFillColor: '#06B6D4' }}> </span>
              </span>
              <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                SPORT
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }} className="hidden xl:flex">
            <Link href="/" style={linkStyle(isActive('/'))} onMouseEnter={e => !isActive('/') && (e.target.style.color = '#06B6D4')} onMouseLeave={e => !isActive('/') && (e.target.style.color = 'rgba(255,255,255,0.88)')}>Accueil</Link>
            <Link href="/le-centre" style={linkStyle(isActive('/le-centre'))} onMouseEnter={e => !isActive('/le-centre') && (e.target.style.color = '#06B6D4')} onMouseLeave={e => !isActive('/le-centre') && (e.target.style.color = 'rgba(255,255,255,0.88)')}>Le centre</Link>

            {/* Prestations dropdown */}
            <div style={{ position: 'relative' }} onMouseEnter={() => setShowPrestations(true)} onMouseLeave={() => setShowPrestations(false)}>
              <button style={{ ...linkStyle(isPrestationActive), display: 'flex', alignItems: 'center', gap: '5px' }}>
                Prestations
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: showPrestations ? 'rotate(180deg)' : 'none' }} />
              </button>

              {showPrestations && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)',
                  width: 220, background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem',
                  padding: '0.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  animation: 'fade-in-up 0.15s ease forwards',
                }}>
                  {prestations.map(item => (
                    <Link key={item.href} href={item.href} style={{
                      display: 'block', padding: '0.65rem 1rem', borderRadius: '0.5rem',
                      fontSize: '0.88rem', textDecoration: 'none',
                      color: pathname === item.href ? '#06B6D4' : 'rgba(255,255,255,0.75)',
                      background: pathname === item.href ? 'rgba(6,182,212,0.08)' : 'transparent',
                      transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = pathname === item.href ? 'rgba(6,182,212,0.08)' : 'transparent'; e.currentTarget.style.color = pathname === item.href ? '#06B6D4' : 'rgba(255,255,255,0.75)'; }}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/abonnements" style={linkStyle(isActive('/abonnements'))} onMouseEnter={e => !isActive('/abonnements') && (e.target.style.color = '#06B6D4')} onMouseLeave={e => !isActive('/abonnements') && (e.target.style.color = 'rgba(255,255,255,0.88)')}>Abonnements</Link>
            <Link href="/evenements"  style={linkStyle(isActive('/evenements'))}  onMouseEnter={e => !isActive('/evenements') && (e.target.style.color = '#06B6D4')} onMouseLeave={e => !isActive('/evenements') && (e.target.style.color = 'rgba(255,255,255,0.88)')}>Événements</Link>
            <Link href="/boutique"    style={linkStyle(isActive('/boutique'))}    onMouseEnter={e => !isActive('/boutique') && (e.target.style.color = '#06B6D4')} onMouseLeave={e => !isActive('/boutique') && (e.target.style.color = 'rgba(255,255,255,0.88)')}>Boutique</Link>
          </div>

          {/* ── Desktop CTA ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden xl:flex">
            <Link href="/reserver" className="btn-primary" style={{ padding: '0.55rem 1.5rem', fontSize: '0.9rem' }}>
              Réserver
            </Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link href={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} style={{
                  display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
                  color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '9999px', padding: '0.4rem 1rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                  <User size={15} style={{ color: '#06B6D4' }} />
                  <span style={{ maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                </Link>
                <button onClick={logout} title="Se déconnecter" style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '9999px', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.50)', transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.50)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link href="/client/login" title="Espace membre" style={{
                width: 38, height: 38, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.70)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.12)'; e.currentTarget.style.color = '#06B6D4'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.70)'; }}>
                <User size={18} />
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden" style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)',
            padding: '0.5rem', zIndex: 60, position: 'relative',
          }}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(24px)',
          zIndex: 55, display: 'flex', flexDirection: 'column', padding: '100px 2rem 2rem',
          overflowY: 'auto', animation: 'fade-in 0.2s ease',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} style={{
                padding: '0.9rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: '1.1rem', fontWeight: 500, textDecoration: 'none',
                color: isActive(link.href) ? '#06B6D4' : '#fff',
              }}>{link.name}</Link>
            ))}

            {/* Prestations submenu */}
            <div style={{ paddingTop: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '0.5rem' }}>
                Prestations
              </span>
              {prestations.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} style={{
                  display: 'block', padding: '0.65rem 0 0.65rem 1rem', fontSize: '1rem', textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  color: pathname === item.href ? '#06B6D4' : 'rgba(255,255,255,0.70)',
                }}>{item.name}</Link>
              ))}
            </div>
          </div>

          {/* Mobile actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
            <Link href="/reserver" onClick={() => setIsOpen(false)} className="btn-primary" style={{ textAlign: 'center', padding: '1rem', fontSize: '1rem' }}>
              Réserver
            </Link>
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} onClick={() => setIsOpen(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '0.9rem', borderRadius: '9999px', textDecoration: 'none',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                  color: '#fff', fontSize: '0.95rem',
                }}>
                  <User size={18} style={{ color: '#06B6D4' }} /> {user.name}
                </Link>
                <button onClick={() => { logout(); setIsOpen(false); }} style={{
                  padding: '0.9rem', borderRadius: '9999px', border: '1px solid rgba(239,68,68,0.25)',
                  background: 'rgba(239,68,68,0.08)', color: '#f87171', cursor: 'pointer', fontSize: '0.95rem',
                }}>
                  Se déconnecter
                </button>
              </>
            ) : (
              <Link href="/client/login" onClick={() => setIsOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '0.9rem', borderRadius: '9999px', textDecoration: 'none',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.80)', fontSize: '0.95rem',
              }}>
                <User size={18} /> Connexion Espace Membre
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
