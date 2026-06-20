"use client"; // Fix indispensable pour l'erreur de l'image image_968838.png

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */
const heroImages = [
  'https://www.tep-sport.com/images/centreHero1.JPG',
  'https://www.tep-sport.com/images/centreHero2.jpeg',
  'https://www.tep-sport.com/images/centreHero3.jpg',
];

const values = [
  { title: 'Individualisation', desc: 'Chaque programme est construit sur-mesure, selon votre objectif, votre niveau et vos disponibilités.' },
  { title: 'Pédagogie', desc: 'Chaque exercice est expliqué pour vous aider à comprendre, mieux exécuter et progresser plus rapidement.' },
  { title: 'Sécurité', desc: 'Technique, progressivité et contrôle, pour avancer en confiance et limiter le risque de blessure.' },
  { title: 'Bienveillance', desc: 'Un accompagnement professionnel, humain, et motivant, quel que soit votre niveau.' },
  { title: 'Exigence', desc: 'Une exigence forte et une méthodologie rigoureuse, au service de résultats mesurables et durables.' },
  { title: 'Plaisir', desc: 'Un environnement stimulant et bienveillant, propice à la régularité et à une progression continue.' },
];

const coaches = [
  {
    name: 'Clément Perraguin',
    role: 'Préparateur physique & Co-fondateur',
    image: 'https://www.tep-sport.com/images/coach-1.jpg',
    bio: "Spécialisé en préparation physique et en planification, Clément accompagne les sportifs et les actifs dans la construction de leur progression. Son approche structurée aide à gagner en performance, tout en gardant un cadre sécurisé et compréhensible. Diplômé d'un Master entraînement et performance sportive, il met l'accent sur la cohérence, la régularité et la qualité d'exécution.",
    specialty: 'Construire des programmes progressifs et structurés, pour des résultats durables, du débutant au compétiteur.',
    link: '/reserver#contact-reservation',
    linkLabel: 'Prendre contact avec Clément',
  },
  {
    name: 'Simon Perraguin',
    role: 'Préparateur physique & Co-fondateur',
    image: 'https://www.tep-sport.com/images/coach-portrait.jpg',
    bio: "Orienté vers l'accompagnement personnalisé, Simon met l'accent sur l'adaptation et l'écoute à chaque étape. Son objectif : proposer une méthode efficace, réaliste, et parfaitement alignée avec vos objectifs, tout en maintenant le niveau d'exigence nécessaire à la progression. Diplômé d'un Master entraînement et performance sportive, il vous guide avec une approche technique, structurée et accessible.",
    specialty: 'Construire des programmes progressifs et structurés, pour des résultats durables, du débutant au compétiteur.',
    link: '/reserver#contact-reservation',
    linkLabel: 'Prendre contact avec Simon',
  },
];

const salleImages = [
  'https://www.tep-sport.com/images/salleMateriel1.jpeg',
  'https://www.tep-sport.com/images/salleMateriel2.jpeg',
  'https://www.tep-sport.com/images/centreee.jpeg',
  'https://www.tep-sport.com/images/salleMateriel4.jpeg',
];

const zones = [
  { title: 'Zone de préparation physique', desc: 'Racks, charges libres, haltères, kettlebells, équipements cardio' },
  { title: 'Espace fonctionnel', desc: 'Zone dédiée au travail au sol et aux mouvements fonctionnels' },
  { title: 'Espace balnéo', desc: 'Sauna, bain chaud, bain froid, pressothérapie, cupping' },
  { title: 'Terrain de padel', desc: 'Terrain de padel extérieur, accessible sur réservation' },
];

/* ─── Slider hook ──────────────────────────────────────── */
function useSlider(length, delay = 4500) {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent((p) => (p + 1) % length);
    }, delay);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [length, delay]);

  const go = (idx) => {
    setCurrent(idx);
    resetTimer();
  };

  const prev = () => go((current - 1 + length) % length);
  const next = () => go((current + 1) % length);

  return { current, go, prev, next };
}

/* ─── Component ─────────────────────────────────────────── */
export default function LeCentre() {
  const valSlider = useSlider(values.length, 3500);
  const salleSlider = useSlider(salleImages.length, 4000);

  // Styles ajustés pour le mode nuit (fonds sombres #0f172a et #1e293b)
  const cssStyles = `
    /* Force la Navbar globale à passer en mode nuit si elle utilise cette classe */
    nav, .navbar, header {
      background-color: #0f172a !important;
      border-bottom: 1px solid #334155 !important;
    }
    nav a, .navbar a, header a {
      color: #f8fafc !important;
    }

    /* Reset & Base Sombre */
    .tc * { box-sizing: border-box; margin: 0; padding: 0; }
    .tc { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
      background: #0f172a; 
      color: #f8fafc; 
      padding-top: 64px; 
    }

    /* ── HERO ── */
    .tc-hero {
      position: relative;
      min-height: 92vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: #0f172a;
    }
    .tc-hero-bg { position: absolute; inset: 0; z-index: 0; }
    .tc-hero-bg img { object-fit: cover; }
    .tc-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(15, 23, 42, 0.85) 40%, rgba(15, 23, 42, 0.4) 100%);
      z-index: 1;
    }
    .tc-hero-content {
      position: relative; z-index: 2;
      max-width: 1200px; margin: 0 auto;
      padding: 0 40px; width: 100%;
    }
    .tc-hero-content h1 {
      font-size: clamp(2.4rem, 5.5vw, 4.2rem);
      font-weight: 900; color: #fff;
      line-height: 1.05; letter-spacing: -0.03em;
      margin-bottom: 8px; text-transform: uppercase;
    }
    .tc-hero-content h1 span { color: #3B82F6; }
    .tc-hero-lead {
      font-size: clamp(1rem, 1.6vw, 1.25rem);
      color: rgba(255,255,255,0.85);
      font-weight: 500; max-width: 520px;
      line-height: 1.55; margin-bottom: 10px;
    }
    .tc-hero-sub {
      font-size: 15px; color: rgba(255,255,255,0.5);
      max-width: 480px; line-height: 1.65; margin-bottom: 36px;
    }
    .tc-btn-blue {
      display: inline-flex; align-items: center; gap: 8px;
      background: #3B82F6; color: #fff;
      font-size: 14px; font-weight: 700;
      padding: 14px 28px; border-radius: 6px;
      text-decoration: none;
      transition: background 0.15s, box-shadow 0.15s;
    }
    .tc-btn-blue:hover { background: #2563eb; box-shadow: 0 4px 18px rgba(59,130,246,.4); }

    /* ── VALUES SLIDER ── */
    .tc-values {
      background: #1e293b;
      border-top: 1px solid #334155;
      border-bottom: 1px solid #334155;
      padding: 64px 40px;
    }
    .tc-values-inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 60px; align-items: center;
    }
    .tc-values-track { position: relative; overflow: hidden; min-height: 200px; }
    .tc-value-slide {
      position: absolute; inset: 0;
      transition: opacity 0.5s ease, transform 0.5s ease;
      display: flex; flex-direction: column; justify-content: center;
    }
    .tc-value-slide.active { opacity: 1; transform: translateX(0); z-index: 1; }
    .tc-value-slide.inactive { opacity: 0; transform: translateX(30px); z-index: 0; }
    .tc-value-num {
      font-size: 11px; font-weight: 800;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #3B82F6; margin-bottom: 14px;
    }
    .tc-value-title {
      font-size: clamp(1.5rem, 3vw, 2.2rem);
      font-weight: 900; color: #f8fafc;
      letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 16px;
    }
    .tc-value-desc { font-size: 15px; color: #94a3b8; line-height: 1.7; max-width: 380px; }
    
    .tc-values-nav { display: flex; flex-direction: column; gap: 0; }
    .tc-values-nav-item {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 0; border-bottom: 1px solid #334155;
      cursor: pointer; transition: all 0.15s;
      background: none; border-left: none; border-right: none; border-top: none;
      text-align: left; width: 100%;
    }
    .tc-values-nav-item:first-child { border-top: 1px solid #334155; }
    .tc-values-nav-item.active .tc-nav-title { color: #3B82F6; font-weight: 800; }
    .tc-values-nav-item.active .tc-nav-bar { background: #3B82F6; }
    .tc-nav-bar {
      width: 3px; height: 36px; border-radius: 2px;
      background: #334155; flex-shrink: 0; transition: background 0.15s;
    }
    .tc-nav-title { font-size: 15px; font-weight: 600; color: #64748b; transition: color 0.15s; }
    .tc-values-discover { margin-top: 32px; text-align: left; }
    
    .tc-btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: #f8fafc;
      font-size: 14px; font-weight: 700;
      padding: 12px 22px; border-radius: 6px;
      border: 1.5px solid #475569; text-decoration: none;
      transition: border-color 0.15s, color 0.15s;
    }
    .tc-btn-outline:hover { border-color: #3B82F6; color: #3B82F6; }

    /* ── TEAM ── */
    .tc-team { padding: 88px 40px; background: #0f172a; }
    .tc-team-inner { max-width: 1200px; margin: 0 auto; }
    .tc-section-eyebrow {
      font-size: 11px; font-weight: 800;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #3B82F6; margin-bottom: 12px;
    }
    .tc-section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.8rem);
      font-weight: 900; color: #f8fafc;
      letter-spacing: -0.025em; line-height: 1.08;
      margin-bottom: 16px; text-transform: uppercase;
    }
    .tc-team-intro { font-size: 15px; color: #94a3b8; line-height: 1.7; max-width: 680px; margin-bottom: 64px; }
    .tc-coaches { display: flex; flex-direction: column; gap: 80px; }
    .tc-coach { display: grid; grid-template-columns: 340px 1fr; gap: 64px; align-items: start; }
    .tc-coach.reverse { grid-template-columns: 1fr 340px; }
    .tc-coach.reverse .tc-coach-img { order: 2; }
    .tc-coach.reverse .tc-coach-text { order: 1; }
    .tc-coach-img {
      position: relative; height: 420px;
      border-radius: 10px; overflow: hidden;
      border: 1px solid #334155;
    }
    .tc-coach-img img { object-fit: cover; object-position: top; }
    .tc-coach-name { font-size: 1.6rem; font-weight: 900; color: #f8fafc; letter-spacing: -0.02em; margin-bottom: 4px; }
    .tc-coach-role { font-size: 13px; font-weight: 600; color: #3B82F6; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
    .tc-coach-bio { font-size: 15px; color: #cbd5e1; line-height: 1.75; margin-bottom: 20px; }
    .tc-coach-specialty {
      background: rgba(59, 130, 246, 0.1);
      border-left: 3px solid #3B82F6;
      padding: 14px 18px; border-radius: 0 6px 6px 0;
      font-size: 14px; color: #93c5fd; line-height: 1.6; margin-bottom: 28px;
    }

    /* ── SALLE ── */
    .tc-salle { padding: 88px 40px; background: #1e293b; border-top: 1px solid #334155; }
    .tc-salle-inner { max-width: 1200px; margin: 0 auto; }
    .tc-salle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-bottom: 56px; }
    .tc-zones { display: flex; flex-direction: column; gap: 0; margin-top: 40px; }
    .tc-zone { padding: 20px 0; border-bottom: 1px solid #334155; display: flex; flex-direction: column; gap: 4px; }
    .tc-zone:first-child { border-top: 1px solid #334155; }
    .tc-zone-title { font-size: 15px; font-weight: 800; color: #f8fafc; }
    .tc-zone-desc { font-size: 13.5px; color: #94a3b8; }
    
    /* salle slider */
    .tc-salle-slider { position: relative; }
    .tc-salle-main {
      position: relative; height: 420px;
      border-radius: 10px; overflow: hidden;
      border: 1px solid #334155; margin-bottom: 12px;
    }
    .tc-salle-main img { object-fit: cover; transition: opacity 0.5s; }
    .tc-salle-thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .tc-salle-thumb {
      position: relative; height: 72px; border-radius: 6px; overflow: hidden;
      border: 2px solid transparent; cursor: pointer; transition: border-color 0.15s;
    }
    .tc-salle-thumb.active { border-color: #3B82F6; }
    .tc-salle-thumb img { object-fit: cover; }
    .tc-salle-arrows {
      position: absolute; top: calc(210px - 20px);
      left: 0; right: 0; z-index: 2;
      display: flex; justify-content: space-between; padding: 0 12px; pointer-events: none;
    }
    .tc-arrow {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(15, 23, 42, 0.9); border: 1px solid #334155; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3); pointer-events: all;
      transition: background 0.15s; color: #f8fafc;
    }
    .tc-arrow:hover { background: #1e293b; }
    .tc-salle-cta { margin-top: 40px; text-align: center; }

    /* ── CTA ── */
    .tc-cta { background: #0f172a; padding: 88px 40px; text-align: center; border-top: 1px solid #334155; }
    .tc-cta h2 {
      font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; color: #fff;
      letter-spacing: -0.025em; line-height: 1.1; text-transform: uppercase; margin-bottom: 16px;
    }
    .tc-cta h2 span { color: #3B82F6; }
    .tc-cta p { font-size: 16px; color: #94a3b8; max-width: 460px; margin: 0 auto 40px; line-height: 1.65; }
    .tc-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .tc-btn-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: #1e293b; color: #f8fafc;
      font-size: 14px; font-weight: 700;
      padding: 14px 28px; border-radius: 6px;
      border: 1px solid #334155; text-decoration: none;
      transition: background 0.15s;
    }
    .tc-btn-white:hover { background: #334155; }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .tc-values-inner { grid-template-columns: 1fr; gap: 40px; }
      .tc-coach, .tc-coach.reverse { grid-template-columns: 1fr; gap: 32px; }
      .tc-coach.reverse .tc-coach-img, .tc-coach.reverse .tc-coach-text { order: unset; }
      .tc-coach-img { height: 300px; }
      .tc-salle-grid { grid-template-columns: 1fr; gap: 40px; }
    }
    @media (max-width: 640px) {
      .tc-hero-content { padding: 0 20px; }
      .tc-values, .tc-team, .tc-salle, .tc-cta { padding-left: 20px; padding-right: 20px; }
      .tc-salle-main { height: 260px; }
      .tc-salle-arrows { top: calc(130px - 20px); }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div className="tc">
        {/* ── HERO ── */}
        <section className="tc-hero">
          <div className="tc-hero-bg">
            <Image src={heroImages[0]} alt="Centre TEP SPORT" fill priority style={{ objectFit: 'cover' }} />
          </div>
          <div className="tc-hero-overlay" />
          <div className="tc-hero-content">
            <h1>Le centre <span>TEP SPORT</span></h1>
            <p className="tc-hero-lead">Un lieu pensé pour progresser, performer et récupérer, conçu pour vous.</p>
            <p className="tc-hero-sub">
              Découvrez nos équipements de pointe et nos espaces dédiés à votre performance. Un environnement moderne et professionnel pour atteindre vos objectifs.
            </p>
            <Link href="/reserver#contact-reservation" className="tc-btn-blue">
              Réserver maintenant
            </Link>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="tc-values">
          <div className="tc-values-inner">
            <div>
              <div className="tc-values-track">
                {values.map((v, i) => (
                  <div key={i} className={`tc-value-slide ${i === valSlider.current ? 'active' : 'inactive'}`}>
                    <div className="tc-value-num">0{i + 1} / 0{values.length}</div>
                    <h3 className="tc-value-title">{v.title}</h3>
                    <p className="tc-value-desc">{v.desc}</p>
                  </div>
                ))}
              </div>
              <div className="tc-values-discover">
                <Link href="/preparation-physique" className="tc-btn-outline">
                  Découvrir nos offres <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            <div className="tc-values-nav">
              {values.map((v, i) => (
                <button
                  key={i}
                  className={`tc-values-nav-item ${i === valSlider.current ? 'active' : ''}`}
                  onClick={() => valSlider.go(i)}
                >
                  <span className="tc-nav-bar" />
                  <span className="tc-nav-title">{v.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="tc-team">
          <div className="tc-team-inner">
            <div className="tc-section-eyebrow">L'équipe</div>
            <h2 className="tc-section-title">L'ÉQUIPE</h2>
            <p className="tc-team-intro">
              TEP SPORT réunit des professionnels engagés, experts en préparation physique et en accompagnement sportif. Chaque coaching s'adapte à votre niveau et à vos objectifs, en s'appuyant sur une méthode structurée et un suivi rigoureux.
            </p>

            <div className="tc-coaches">
              {coaches.map((c, i) => (
                <div key={i} className={`tc-coach${i % 2 === 1 ? ' reverse' : ''}`}>
                  <div className="tc-coach-img">
                    <Image src={c.image} alt={c.name} fill sizes="340px" />
                  </div>
                  <div className="tc-coach-text">
                    <h3 className="tc-coach-name">{c.name}</h3>
                    <div className="tc-coach-role">{c.role}</div>
                    <p className="tc-coach-bio">{c.bio}</p>
                    <div className="tc-coach-specialty">
                      <strong>Sa spécialité :</strong> {c.specialty}
                    </div>
                    <Link href={c.link} className="tc-btn-blue">
                      {c.linkLabel}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SALLE & MATÉRIEL ── */}
        <section className="tc-salle">
          <div className="tc-salle-inner">
            <div className="tc-salle-grid">
              <div>
                <div className="tc-section-eyebrow">Équipements</div>
                <h2 className="tc-section-title">LA SALLE ET LE MATÉRIEL</h2>
                <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7 }}>
                  Le centre TEP SPORT propose un espace complet, conçu pour vous et alliant :
                </p>
                <div className="tc-zones">
                  {zones.map((z, i) => (
                    <div key={i} className="tc-zone">
                      <div className="tc-zone-title">{z.title}</div>
                      <div className="tc-zone-desc">{z.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tc-salle-slider">
                <div className="tc-salle-main">
                  <Image src={salleImages[salleSlider.current]} alt="Salle TEP SPORT" fill sizes="(max-width: 1024px) 100vw, 600px" />
                  <div className="tc-salle-arrows">
                    <button className="tc-arrow" onClick={salleSlider.prev} aria-label="Précédent">
                      <ChevronLeft size={18} />
                    </button>
                    <button className="tc-arrow" onClick={salleSlider.next} aria-label="Suivant">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="tc-salle-thumbs">
                  {salleImages.map((src, i) => (
                    <div
                      key={i}
                      className={`tc-salle-thumb ${i === salleSlider.current ? 'active' : ''}`}
                      onClick={() => salleSlider.go(i)}
                    >
                      <Image src={src} alt={`Salle ${i + 1}`} fill sizes="120px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tc-salle-cta">
              <Link href="/reserver" className="tc-btn-blue">
                Réserver une séance
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="tc-cta">
          <h2>REJOIGNEZ <span>TEP SPORT</span></h2>
          <p>Lancez-vous dès maintenant et faites-vous accompagner par une équipe dédiée à votre réussite.</p>
          <div className="tc-cta-btns">
            <Link href="/reserver" className="tc-btn-blue">Réserver une séance</Link>
            <Link href="/boutique#programs-section" className="tc-btn-white">Nos programmes</Link>
          </div>
        </section>
      </div>
    </>
  );
}