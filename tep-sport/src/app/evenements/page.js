'use client';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';

export default function Evenements() {
  const { events } = useData();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Stages & Tournois</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Événements <span className="gradient-text-animated">TEP Sport</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Rejoignez nos événements, tournois et stages thématiques pour booster vos performances et partager des moments de sport intenses.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto" />
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {events.map((evt) => (
              <div key={evt.id} className="glass-card overflow-hidden group flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {evt.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-white/5 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-cyan-400" />
                      <span>{new Date(evt.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-cyan-400" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-cyan-400" />
                      <span>{evt.spotsLeft} places restantes / {evt.spots} max</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link 
                    href="/reserver"
                    className="btn-primary w-full text-center py-2.5 text-sm flex items-center justify-center gap-1.5"
                  >
                    <Ticket size={16} /> S'inscrire à l'événement
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
