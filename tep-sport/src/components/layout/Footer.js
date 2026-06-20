'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// On ne garde que les icônes de contact et d'horaires qui fonctionnent bien
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const services = [
    { name: 'Préparation & coaching', href: '/preparation-physique' },
    { name: 'Récupération', href: '/recuperation' },
    { name: 'Padel', href: '/padel' },
    { name: 'Cours Collectifs', href: '/cours-collectifs' },
  ];

  const apropos = [
    { name: 'Le centre', href: '/le-centre' },
    { name: 'Abonnement', href: '/abonnements' },
    { name: 'Boutique', href: '/boutique' },
    { name: 'Événements & Stages', href: '/evenements' },
    { name: 'Contact', href: '/reserver' },
  ];

  // Remplacement par des SVG purs pour éviter les caprices de lucide-react
  const socials = [
    {
      Icon: () => (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
      href: 'https://www.facebook.com/tepsport.off/',
      label: 'Facebook',
      hoverColor: '#1877F2'
    },
    {
      Icon: () => (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
      href: 'https://www.instagram.com/tep_sport/',
      label: 'Instagram',
      hoverColor: '#E1306C'
    },
    {
      Icon: () => (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: 'https://www.linkedin.com/company/tep-sport/',
      label: 'LinkedIn',
      hoverColor: '#0A66C2'
    },
  ];

  const colTitle = {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '1.4rem',
    letterSpacing: '0.01em',
  };

  const colLink = {
    display: 'block',
    color: 'rgba(255,255,255,0.52)',
    textDecoration: 'none',
    fontSize: '0.88rem',
    lineHeight: 1,
    padding: '0.45rem 0',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  };

  return (
    <footer style={{
      position: 'relative',
      background: 'rgba(0,0,0,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
      zIndex: 10,
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 300,
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Main content ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>

          {/* ── Col 1: Brand ── */}
          <div style={{ maxWidth: 260 }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '1.2rem' }}>
              <svg width="44" height="32" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="2,22 10,22 14,10 18,34 22,18 26,26 30,22 38,22" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="50" cy="10" r="4" fill="#06B6D4" />
                <line x1="50" y1="14" x2="47" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="14" x2="53" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="47" y1="24" x2="44" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="47" y1="24" x2="50" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="48" y1="18" x2="55" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div style={{ lineHeight: 1.1 }}>
                <span style={{
                  display: 'block',
                  fontSize: '1.3rem', fontWeight: 900,
                  background: 'linear-gradient(135deg, #fff 40%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>TEP</span>
                <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>SPORT</span>
              </div>
            </Link>

            <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Centre de préparation physique, coaching personnalisé, récupération et padel à Montlouis-sur-Loire.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socials.map(({ Icon, href, label, hoverColor }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.60)',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = hoverColor;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = hoverColor;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.60)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Nos Services ── */}
          <div>
            <h4 style={colTitle}>Nos services</h4>
            {services.map(s => (
              <Link key={s.href} href={s.href} style={colLink}
                onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.52)'}>
                {s.name}
              </Link>
            ))}
          </div>

          {/* ── Col 3: À propos ── */}
          <div>
            <h4 style={colTitle}>À propos</h4>
            {apropos.map(a => (
              <Link key={a.href} href={a.href} style={colLink}
                onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.52)'}>
                {a.name}
              </Link>
            ))}
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h4 style={colTitle}>Contact</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <a href="tel:+33789235373" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.60)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.60)'}>
                <Phone size={15} style={{ color: '#06B6D4', flexShrink: 0 }} />
                07.89.23.53.73
              </a>

              <a href="mailto:contact@tep-sport.com" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.60)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.60)'}>
                <Mail size={15} style={{ color: '#06B6D4', flexShrink: 0 }} />
                contact@tep-sport.com
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(255,255,255,0.60)', fontSize: '0.88rem' }}>
                <MapPin size={15} style={{ color: '#06B6D4', flexShrink: 0, marginTop: '2px' }} />
                <span>3 bis Rue Clément Ader<br />37270 Montlouis-sur-Loire</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(255,255,255,0.60)', fontSize: '0.88rem' }}>
                <Clock size={15} style={{ color: '#06B6D4', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div>Lun – Ven : 8h – 22h</div>
                  <div>Sam – Dim : 8h – 21h</div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=3+bis+Rue+Clément+Ader+37270+Montlouis-sur-Loire"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  marginTop: '0.25rem', fontSize: '0.78rem', fontWeight: 600,
                  color: '#06B6D4', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#22D3EE'}
                onMouseLeave={e => e.currentTarget.style.color = '#06B6D4'}
              >
                Laissez-nous un avis ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1.8rem' }} />

        {/* ── Bottom bar ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} TEP Sport. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '1.8rem' }}>
            {[
              { name: 'Mentions légales', href: '/mentions-legales' },
              { name: 'CGV', href: '/cgv' },
              { name: 'Confidentialité', href: '/politique-de-confidentialite' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}>
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}