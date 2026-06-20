'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Flame, Heart, Compass, Star, ChevronRight } from 'lucide-react';

export default function LeCentre() {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    'https://www.tep-sport.com/images/accueil1.JPG',
    'https://www.tep-sport.com/images/accueil2.jpg',
    'https://www.tep-sport.com/images/accueil3.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const values = [
    { title: 'Individualisation', desc: 'Chaque programme est construit sur-mesure, selon votre objectif, votre niveau et vos disponibilités.', icon: <Compass className="text-cyan-400" size={24} /> },
    { title: 'Pédagogie', desc: 'Chaque exercice est expliqué pour vous aider à comprendre, mieux exécuter et progresser plus rapidement.', icon: <Flame className="text-cyan-400" size={24} /> },
    { title: 'Sécurité', desc: 'Technique, progressivité et contrôle, pour avancer en confiance et limiter le risque de blessure.', icon: <ShieldCheck className="text-cyan-400" size={24} /> },
    { title: 'Bienveillance', desc: 'Un accompagnement professionnel, humain, et motivant, quel que soit votre niveau.', icon: <Heart className="text-cyan-400" size={24} /> },
    { title: 'Exigence', desc: 'Une exigence forte et une méthodologie rigoureuse, au service de résultats mesurables et durables.', icon: <Star className="text-cyan-400" size={24} /> },
    { title: 'Plaisir', desc: 'Un environnement stimulant et bienveillant, propice à la régularité et à une progression continue.', icon: <Flame className="text-cyan-400" size={24} /> },
  ];

  const spaces = [
    {
      title: 'Espace Musculation & Force',
      desc: 'Équipé de matériel haut de gamme (barres olympiques, racks à squats, haltères jusqu\'à 50kg, machines à charge libre) pour développer votre force et puissance.',
      image: 'https://www.tep-sport.com/images/accueil1.JPG'
    },
    {
      title: 'Zone Cardio & Endurance',
      desc: 'Rameurs, vélos de course, tapis de course et Assault Bikes pour travailler votre capacité cardiovasculaire et votre endurance métabolique.',
      image: 'https://www.tep-sport.com/images/prep1.jpg'
    },
    {
      title: 'Zone de Récupération active',
      desc: 'Notre pôle inclut un sauna traditionnel et des bains froids pour le contraste thermique, idéal pour réduire les courbatures et optimiser la régénération.',
      image: 'https://www.tep-sport.com/images/accueil3.jpg'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Découvrir</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Le centre <span className="gradient-text-animated">TEP SPORT</span>
              </h1>
              <p className="text-white/80 text-lg sm:text-xl font-light leading-relaxed">
                Un lieu unique pensé pour progresser, performer et récupérer, conçu pour vous.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto lg:mx-0" />
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Situé à Montlouis-sur-Loire, TEP SPORT propose un environnement moderne avec des équipements haut de gamme. Nos coachs certifiés vous accompagnent dans votre transformation physique.
              </p>
              <div className="pt-4 flex justify-center lg:justify-start">
                <Link href="/reserver" className="btn-primary">
                  Prendre rendez-vous <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === activeSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`TEP Centre ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
                </div>
              ))}
              <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === activeSlide ? 'bg-cyan-500 w-5' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-black/30 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Philosophie</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Nos valeurs clés</h2>
            <p className="text-white/60">
              Des fondations solides pour vous accompagner efficacement tout au long de votre parcours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="glass-card p-8 space-y-4 hover:border-cyan-500/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{val.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces Showcase */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm font-semibold">Les Espaces</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Plateau technique & Récupération</h2>
          </div>

          <div className="space-y-12">
            {spaces.map((space, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{space.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">{space.desc}</p>
                </div>
                <div className={`lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
