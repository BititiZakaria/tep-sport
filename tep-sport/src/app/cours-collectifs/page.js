'use client';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Calendar, User, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function CoursCollectifs() {
  const { coursCollectifs } = useData();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-6 animate-fade-in-up">
          <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Prestations</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            Cours <span className="gradient-text-animated">Collectifs</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Des séances en petit groupe, encadrées par nos coachs certifiés, pour allier motivation collective et suivi technique individualisé.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto" />
          <div className="pt-4">
            <Link href="/reserver" className="btn-primary">
              Réserver un cours collectifs
            </Link>
          </div>
        </div>
      </section>

      {/* Class list Section */}
      <section className="py-16 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Planning & Formats</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Nos formats de cours</h2>
            <p className="text-white/60">
              Des sessions limitées en places pour garantir la qualité de l'encadrement technique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursCollectifs.map((cours) => (
              <div key={cours.id} className="glass-card p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {cours.name}
                    </span>
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <Clock size={12} /> {cours.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cours.day}
                  </h3>
                  
                  <p className="text-sm text-white/60 leading-relaxed">
                    {cours.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/50">
                  <span className="flex items-center gap-1 font-medium">
                    <User size={14} className="text-cyan-400" /> Coach: {cours.coach}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-400" /> {cours.spots} places max
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Info */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 border border-yellow-500/10 bg-yellow-500/5 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="text-yellow-500" size={24} />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-lg font-bold text-white">Règles d'accès aux cours collectifs</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Afin de garantir un encadrement sécurisé et respectueux pour tous, toute réservation doit être annulée au moins 12 heures à l'avance. Dans le cas contraire, la séance sera comptabilisée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
