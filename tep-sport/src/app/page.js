'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dumbbell, Trophy, Users, Shield, ArrowRight, Play, CheckCircle2, Star, Waves, TrendingUp } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Home() {
  const { testimonials, services } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const carouselImages = [
    'https://www.tep-sport.com/images/accueil1.JPG',
    'https://www.tep-sport.com/images/accueil2.jpg',
    'https://www.tep-sport.com/images/accueil3.jpg',
    'https://www.tep-sport.com/images/accueil4.jpeg'
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const stats = [
    { icon: <CheckCircle2 size={28} />, value: '100%', label: 'Personnalisé', desc: 'Approche sur-mesure' },
    { icon: <Shield size={28} />,      value: 'Expert', label: 'Encadrement',  desc: 'Coachs diplômés d\'État' },
    { icon: <TrendingUp size={28} />,  value: 'Tous',   label: 'Niveaux',      desc: 'Débutant à compétiteurs' },
  ];

  const getIcon = (iconName) => {
    const cls = 'text-cyan-400';
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell size={26} className={cls} />;
      case 'Waves':    return <Waves    size={26} className={cls} />;
      case 'Trophy':   return <Trophy   size={26} className={cls} />;
      case 'Users':    return <Users    size={26} className={cls} />;
      default:         return <Dumbbell size={26} className={cls} />;
    }
  };

  const methodItems = [
    { num: '01', title: 'Bilan Initial Complet',    text: 'Nous analysons vos antécédents, vos points forts et axes d\'amélioration pour concevoir le programme parfait.' },
    { num: '02', title: 'Suivi Millimétré',          text: 'Chaque séance est enregistrée pour mesurer précisément votre progression et ajuster les charges.' },
    { num: '03', title: 'Zone Récupération Unique',  text: 'Accélérez votre régénération avec notre protocole sauna et bains froids (méthode contrastée).' },
    { num: '04', title: 'Flexibilité Totale',        text: 'Réservez vos créneaux en ligne en quelques clics via votre espace membre dédié.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ══════════ HERO SECTION ══════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>

        {/* Ambient glow spots (mimic the real site's warm/cool blobs inside hero) */}
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0
        }}>
          {/* Warm red-orange glow — top right */}
          <div style={{
            position: 'absolute', width: '700px', height: '700px',
            top: '-120px', right: '-80px',
            background: 'radial-gradient(ellipse, rgba(200,60,20,0.60) 0%, rgba(160,70,10,0.35) 35%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(90px)',
            animation: 'blobA 20s ease-in-out infinite alternate'
          }} />
          {/* Cool teal glow — bottom right */}
          <div style={{
            position: 'absolute', width: '600px', height: '600px',
            bottom: '-80px', right: '-60px',
            background: 'radial-gradient(ellipse, rgba(6,100,200,0.50) 0%, rgba(6,182,212,0.25) 40%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(80px)',
            animation: 'blobB 25s ease-in-out infinite alternate-reverse'
          }} />
          {/* Subtle left warm accent */}
          <div style={{
            position: 'absolute', width: '400px', height: '400px',
            top: '30%', left: '-100px',
            background: 'radial-gradient(ellipse, rgba(180,40,10,0.25) 0%, transparent 65%)',
            borderRadius: '50%', filter: 'blur(70px)',
          }} />
        </div>

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px', margin: '0 auto' }}
             className="animate-fade-in-up">
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '1.5rem',
          }}>
            Progressez avec méthode,<br />
            performez avec{' '}
            <span className="gradient-text-animated">TEP SPORT</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            Centre de préparation physique, coaching personnalisé, récupération et padel.<br />
            Un accompagnement structuré et accessible, du débutant au compétiteur.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/reserver" className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}>
              Réserver une séance <ArrowRight size={18} />
            </Link>
            <Link href="/le-centre" className="btn-outline" style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}>
              <Play size={16} fill="white" style={{ marginRight: '6px' }} /> Découvrir le centre
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ PHILOSOPHY BANNER ══════════ */}
      <section style={{ padding: '2rem 1.5rem', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '2.5rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Glow accents inside card */}
            <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />

            <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)', fontWeight: 400, color: 'rgba(255,255,255,0.92)', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
              <span style={{ color: '#22D3EE', fontWeight: 800 }}>TEP</span> repose sur trois piliers :{' '}
              <span style={{ fontWeight: 700, color: '#fff', textDecoration: 'underline', textDecorationColor: '#06B6D4', textUnderlineOffset: '5px' }}>
                Travail, Expertise, Performance
              </span>{' '}
              et porte une conviction forte :{' '}
              <span style={{ color: '#22D3EE', fontWeight: 800 }}>Tout Est Possible</span>.
            </p>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', position: 'relative', zIndex: 1 }}>
              TEP SPORT est née d'une idée simple : vous faire progresser avec une vraie méthode, de façon claire, individualisée et structurée.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ STATS + IMAGE SLIDER ══════════ */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>

          {/* Stats column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {stats.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.8rem 2rem', display: 'flex', alignItems: 'center', gap: '1.2rem', cursor: 'default' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '14px', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(37,99,235,0.15))',
                  border: '1px solid rgba(6,182,212,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#22D3EE'
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg, #22D3EE, #2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginTop: '2px' }}>{s.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.8rem' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Slider */}
          <div style={{ position: 'relative', minHeight: '400px', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {carouselImages.map((src, idx) => (
              <div key={idx} style={{
                position: 'absolute', inset: 0,
                opacity: idx === currentSlide ? 1 : 0,
                transition: 'opacity 1.2s ease',
                zIndex: idx === currentSlide ? 2 : 1,
              }}>
                <Image src={src} alt={`TEP Sport ${idx + 1}`} fill className="object-cover" sizes="700px" priority={idx === 0} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)' }} />
              </div>
            ))}

            {/* Overlay label */}
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 10 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#22D3EE', display: 'block', marginBottom: '4px' }}>Le Centre</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Des installations premium à votre service</span>
            </div>

            {/* Slider dots */}
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 10, display: 'flex', gap: '6px' }}>
              {carouselImages.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} style={{
                  height: 8, width: idx === currentSlide ? 24 : 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: idx === currentSlide ? '#06B6D4' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.3s ease', padding: 0
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ NOS SERVICES ══════════ */}
      <section style={{ padding: '5rem 1.5rem', position: 'relative' }}>
        {/* Section bg accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.30)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Prestations</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '1rem' }}>
              NOS UNIVERS SPORTIFS
            </h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #06B6D4, #2563EB)', borderRadius: 2, margin: '0 auto 1.2rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Chaque espace a été conçu pour optimiser vos performances et accélérer votre récupération.
            </p>
          </div>

          {/* Services grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {services.map((service) => (
              <div key={service.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <Image
                    src={service.image} alt={service.title} fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
                  <div style={{
                    position: 'absolute', bottom: '1rem', left: '1rem',
                    width: 44, height: 44, borderRadius: '10px',
                    background: 'rgba(0,0,0,0.70)', border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>{service.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, flex: 1 }}>{service.shortDesc}</p>
                  <Link href={service.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: '#06B6D4', fontWeight: 600, fontSize: '0.85rem',
                    textDecoration: 'none', transition: 'color 0.2s ease',
                    marginTop: 'auto'
                  }}>
                    En savoir plus <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VOTRE PROGRESSION, NOTRE MISSION ══════════ */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left text */}
          <div>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>La méthode TEP</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.6rem' }}>
              VOTRE PROGRESSION,
            </h2>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem' }}
                className="gradient-text">
              NOTRE MISSION
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Ici, pas de programmes génériques imprimés à la va-vite. Nous plaçons la science du sport et l'individualisation au cœur de votre pratique.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Encadrement de haut niveau', desc: 'Nos protocoles sont inspirés du sport de haut niveau, adaptés à votre condition physique.' },
                { title: 'Technologie & Data',          desc: 'Nous quantifions l\'effort pour maximiser les résultats tout en évitant le surentraînement.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem' }}>
                  <CheckCircle2 style={{ color: '#06B6D4', flexShrink: 0, marginTop: '2px' }} size={20} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right method cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {methodItems.map((m) => (
              <div key={m.num} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'rgba(6,182,212,0.25)', fontVariantNumeric: 'tabular-nums', marginBottom: '0.5rem' }}>{m.num}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{m.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.8rem', lineHeight: 1.6 }}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(0,0,0,0.35)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Avis clients</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              ILS S'ENTRAÎNENT CHEZ NOUS
            </h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #06B6D4, #2563EB)', borderRadius: 2, margin: '1rem auto 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t) => (
              <div key={t.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} style={{ fill: '#06B6D4', color: '#06B6D4' }} />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', flex: 1 }}>
                  "{t.text}"
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.75rem', marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, rgba(37,99,235,0.10) 40%, transparent 75%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '1.2rem' }}>
            Prêt à commencer l'aventure ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Que vous souhaitiez réserver un terrain de padel, rejoindre nos cours collectifs ou planifier un coaching individuel, notre équipe est là pour vous guider.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/reserver" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.4rem' }}>
              Réservez votre séance d'essai
            </Link>
            <Link href="/abonnements" className="btn-outline" style={{ fontSize: '1rem', padding: '0.9rem 2.4rem' }}>
              Voir nos formules
            </Link>
          </div>
        </div>
      </section>

      {/* Inline keyframes for hero blobs */}
      <style>{`
        @keyframes blobA {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          50%  { transform: translate(-50px, 40px) scale(1.10) rotate(10deg); }
          100% { transform: translate(30px, -30px) scale(0.93) rotate(-5deg); }
        }
        @keyframes blobB {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          50%  { transform: translate(40px, -50px) scale(1.08) rotate(-8deg); }
          100% { transform: translate(-20px, 30px) scale(0.95) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
