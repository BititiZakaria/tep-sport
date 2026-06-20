'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dumbbell, Trophy, Users, Shield, ArrowRight, Play, CheckCircle2, Star, Waves } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Home() {
  const { testimonials, services } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    'https://www.tep-sport.com/images/accueil1.JPG',
    'https://www.tep-sport.com/images/accueil2.jpg',
    'https://www.tep-sport.com/images/accueil3.jpg',
    'https://www.tep-sport.com/images/accueil4.jpeg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const stats = [
    { value: '100%', title: 'Personnalisé', desc: 'Approche sur-mesure pour chacun' },
    { value: 'Expert', title: 'Encadrement', desc: 'Coachs diplômés d\'État' },
    { value: 'Tous', title: 'Niveaux', desc: 'Du débutant au compétiteur' }
  ];

  const pillars = [
    { title: 'Travail', text: 'La base de toute progression physique et mentale.' },
    { title: 'Expertise', text: 'Un encadrement technique rigoureux et adapté.' },
    { title: 'Performance', text: 'Atteindre et dépasser vos objectifs personnels.' }
  ];

  const features = [
    { num: '01', title: 'Bilan Initial Complet', text: 'Nous analysons vos antécédents, vos points forts et axes d\'amélioration pour concevoir le programme parfait.' },
    { num: '02', title: 'Suivi Millimétré', text: 'Chaque séance est enregistrée pour mesurer précisément votre progression et ajuster les charges de travail.' },
    { num: '03', title: 'Zone Récupération Unique', text: 'Accélérez votre régénération avec notre protocole sauna et bains froids (méthode contrastée).' },
    { num: '04', title: 'Flexibilité Totale', text: 'Réservez vos créneaux en ligne en quelques clics via votre espace membre dédié.' }
  ];

  // Helper to map icon names to Lucide icons
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell size={28} className="text-cyan-400" />;
      case 'Waves': return <Waves size={28} className="text-cyan-400" />;
      case 'Trophy': return <Trophy size={28} className="text-cyan-400" />;
      case 'Users': return <Users size={28} className="text-cyan-400" />;
      default: return <Dumbbell size={28} className="text-cyan-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center z-10 space-y-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight">
            Progressez avec méthode,<br />
            performez avec <span className="gradient-text-animated">TEP SPORT</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Centre de préparation physique, coaching personnalisé, récupération et padel.<br />
            Un accompagnement structuré et accessible, du débutant au compétiteur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/reserver" className="btn-primary min-w-[200px] text-lg py-4">
              Réserver une séance <ArrowRight size={18} />
            </Link>
            <Link href="/le-centre" className="btn-outline min-w-[200px] text-lg py-4">
              <Play size={18} fill="white" className="mr-1" /> Découvrir le centre
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
            {/* Background design glow */}
            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center space-y-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/95 leading-relaxed">
                <span className="text-cyan-400 font-bold">TEP</span> repose sur trois piliers :{' '}
                <span className="underline decoration-cyan-500 decoration-2 underline-offset-4 font-semibold text-white">
                  Travail, Expertise, Performance
                </span>{' '}
                et porte une conviction forte : <span className="text-cyan-400 font-bold">Tout Est Possible</span>.
              </p>
              <p className="text-white/70 max-w-3xl mx-auto text-base sm:text-lg">
                TEP SPORT est née d'une idée simple : vous faire progresser avec une vraie méthode, de façon claire, individualisée et structurée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase / Image Slider & Stats */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Stats Block (Left on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card p-6 flex flex-col justify-center flex-1 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                  <div className="absolute right-4 top-4 text-cyan-500/5 group-hover:text-cyan-500/10 text-6xl font-black transition-colors">
                    {i + 1}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-cyan-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{stat.title}</div>
                  <div className="text-sm text-white/60">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Slider Block (Right on desktop) */}
            <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-full rounded-2xl overflow-hidden border border-white/10 group">
              {carouselImages.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                  } transition-transform ease-out`}
                >
                  <Image
                    src={src}
                    alt={`TEP Sport Carousel ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              ))}
              
              {/* Slider overlay info */}
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1 block">Le Centre</span>
                <h3 className="text-xl font-bold text-white">Des installations premium à votre service</h3>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-cyan-500 w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Prestations</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Nos univers sportifs</h2>
            <p className="text-white/60">
              Chaque espace a été conçu pour optimiser vos performances et accélérer votre récupération.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="glass-card overflow-hidden group flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 p-2 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md">
                    {getIcon(service.icon)}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <Link href={service.href} className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors mt-auto">
                    En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TEP Sport Section */}
      <section className="py-20 px-6 bg-black/40 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">La méthode TEP</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Pourquoi choisir notre centre de performance ?
              </h2>
              <p className="text-white/75 leading-relaxed">
                Ici, pas de machines guidées superflues ni de programmes génériques imprimés à la va-vite. Nous plaçons la science du sport et l'individualisation au cœur de votre pratique.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-cyan-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-bold">Un encadrement d'athlètes à votre portée</h4>
                    <p className="text-sm text-white/60">Nos protocoles sont inspirés du sport de haut niveau, adaptés à votre condition physique.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="text-cyan-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-bold">Technologie & Data</h4>
                    <p className="text-sm text-white/60">Nous quantifions l'effort pour maximiser les résultats tout en évitant le surentraînement.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat) => (
                <div key={feat.num} className="glass-card p-6 space-y-3 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="text-2xl font-black text-cyan-400/30 font-mono">{feat.num}</div>
                  <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{feat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Avis clients</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ils s'entraînent chez nous</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div key={test.id} className="glass-card p-8 flex flex-col justify-between space-y-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <p className="text-white/80 italic text-sm leading-relaxed">
                    "{test.text}"
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{test.name}</h4>
                  <p className="text-xs text-white/50">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background decorative blurry spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-[100px] opacity-15 -z-10" />

        <div className="container mx-auto max-w-4xl text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Prêt à commencer l'aventure ?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
            Que vous souhaitiez réserver un terrain de padel, rejoindre nos cours collectifs ou planifier un coaching individuel, notre équipe est là pour vous guider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/reserver" className="btn-primary text-lg px-8 py-4">
              Réservez votre séance d'essai
            </Link>
            <Link href="/abonnements" className="btn-outline text-lg px-8 py-4">
              Voir nos formules
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
