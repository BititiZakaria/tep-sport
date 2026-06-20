'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Wind, Waves, Thermometer, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Recuperation() {
  const processes = [
    {
      title: 'Sauna Finlandais (Chaleur)',
      desc: 'Une séance de 15 minutes à 85°C pour dilater les vaisseaux sanguins, stimuler la circulation, détendre les tensions musculaires et déclencher une forte sudation pour éliminer les toxines.',
      icon: <Flame className="text-orange-400" size={24} />
    },
    {
      title: 'Bain Froid (Vasoconstriction)',
      desc: 'Une immersion de 2 à 3 minutes dans un bain à 8-10°C. Provoque un choc thermique qui resserre les vaisseaux, réduit l\'inflammation musculaire, calme le système nerveux et accélère la récupération.',
      icon: <Waves className="text-cyan-400" size={24} />
    },
    {
      title: 'Repos & Réhydratation',
      desc: 'Un temps de retour au calme de 10 minutes allongé dans notre espace lounge avec tisanerie et eau filtrée pour permettre à la température corporelle et au rythme cardiaque de se stabiliser.',
      icon: <Wind className="text-emerald-400" size={24} />
    }
  ];

  const benefits = [
    'Réduction significative des courbatures et de la fatigue musculaire',
    'Amélioration de la qualité du sommeil et réduction du stress',
    'Stimulation du système immunitaire et cardiovasculaire',
    'Accélération de la régénération cellulaire après des séances intenses',
    'Amélioration de la souplesse et de l\'élasticité musculaire',
    'Activation de la circulation lymphatique'
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Info */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Prestations</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Espace<br />
                <span className="gradient-text-animated">Récupération</span>
              </h1>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Optimisez votre régénération musculaire grâce à la méthode contrastée combinant sauna traditionnel et bains chauds/froids.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto lg:mx-0" />
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Link href="/reserver" className="btn-primary">
                  Réserver un créneau
                </Link>
                <Link href="/abonnements" className="btn-outline">
                  Découvrir les offres
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://www.tep-sport.com/images/accueil3.jpg"
                alt="Zone de récupération sauna"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Le Protocole contrasté</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Comment ça marche ?</h2>
            <p className="text-white/60 font-light">
              Le secret réside dans l'alternance thermique chaud-froid pour créer une véritable "pompe vasculaire".
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {processes.map((proc, idx) => (
              <div key={idx} className="glass-card p-8 space-y-4 hover:border-cyan-500/30 transition-all duration-300 relative">
                <div className="absolute right-6 top-6 text-6xl font-black text-white/5">
                  0{idx + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {proc.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{proc.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Les bénéfices</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Pourquoi la récupération est capitale ?
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                S'entraîner dur est important, mais c'est durant la phase de récupération que votre corps s'adapte, se répare et progresse. Notre espace vous offre des outils de niveau professionnel pour maximiser ce processus.
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="glass-card p-4 flex items-center gap-3 border border-white/5 hover:border-cyan-500/20 transition-all">
                  <CheckCircle2 className="text-cyan-400 shrink-0" size={20} />
                  <span className="text-sm text-white/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
