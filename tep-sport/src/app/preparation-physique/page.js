'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Users, TrendingUp, Calendar, CheckCircle2, Dumbbell, Shield, Sparkles } from 'lucide-react';

export default function PreparationPhysique() {
  const targets = [
    { title: 'Sportifs loisirs', desc: 'Vous pratiquez un sport pour le plaisir et souhaitez progresser avec un encadrement professionnel.', icon: <Users size={24} className="text-cyan-400" /> },
    { title: 'Performance', desc: 'Sportifs individuels ou en club cherchant à optimiser leurs performances en compétition.', icon: <Target size={24} className="text-cyan-400" /> },
    { title: 'Transformation physique', desc: 'Reprise sportive, perte de poids, remise en forme : un programme adapté à vos besoins.', icon: <TrendingUp size={24} className="text-cyan-400" /> },
    { title: 'Réathlétisation', desc: 'Retour de blessure avec un accompagnement sécurisé et une progression maîtrisée.', icon: <Calendar size={24} className="text-cyan-400" /> }
  ];

  const pillars = [
    { num: 1, title: 'Technique', desc: 'Une attention particulière à la technique pour éviter les blessures et optimiser chaque mouvement.' },
    { num: 2, title: 'Régularité', desc: 'Création d\'habitudes d\'entraînement pour un progrès continu et durable dans le temps.' },
    { num: 3, title: 'Intensité', desc: 'Calcul de charge et d\'intensité adapté à vos capacités du jour pour des résultats maximaux.' },
    { num: 4, title: 'Planification', desc: 'Cycles de travail structurés avec bilans réguliers pour suivre votre évolution.' }
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
                Préparation<br />
                <span className="gradient-text-animated">physique & coaching</span>
              </h1>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Un accompagnement personnalisé, construit autour de vos objectifs et de votre rythme, pour vous permettre de progresser de manière efficace et durable.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto lg:mx-0" />
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Link href="/reserver" className="btn-primary">
                  Réserver maintenant
                </Link>
                <Link href="/abonnements" className="btn-outline">
                  Découvrir les formules
                </Link>
              </div>
            </div>

            {/* Right Images Display */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://www.tep-sport.com/images/prep1.jpg"
                alt="Coaching physique"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Whom section */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Accessibilité</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Pour qui ?</h2>
            <p className="text-white/60">
              Nos séances de coaching s'adaptent à tous les profils et tous les niveaux de pratique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {targets.map((target, idx) => (
              <div key={idx} className="glass-card p-6 flex gap-4 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
                  {target.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{target.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{target.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Pillars */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Méthodologie</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Les 4 Piliers TEP</h2>
            <p className="text-white/60 font-light">
              Une rigueur scientifique et technique au service de votre progression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.num} className="glass-card p-6 space-y-4 border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
                <div className="absolute right-4 top-2 text-6xl font-black text-white/5 group-hover:text-cyan-400/5 transition-colors">
                  0{pillar.num}
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">
                  {pillar.num}
                </div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
