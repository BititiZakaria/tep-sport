'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Calendar, CheckCircle2, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

export default function Padel() {
  const prices = [
    { name: 'Créneau Simple (1h30)', price: '36', detail: 'Soit 9€ par joueur (pour 4 joueurs)', features: ['Accès terrain panoramique', 'Balles non incluses', 'Racks de rangement'] },
    { name: 'Carnet 10 Séances', price: '320', detail: 'Valable 1 an, partageable', features: ['Économisez 40€ au total', 'Réservation prioritaire', 'Annulation flexible'] },
    { name: 'Location Raquette + Balles', price: '3', detail: 'Par joueur / session', features: ['Raquettes haut de gamme', '3 balles neuves fournies', 'Prêt de lunettes de protection'] }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Info */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Padel</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Terrain de <span className="gradient-text-animated">Padel</span>
              </h1>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Réservez notre terrain panoramique premium de padel à Montlouis-sur-Loire. Jouez en famille, entre amis ou entre collègues.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto lg:mx-0" />
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Link href="/reserver" className="btn-primary">
                  Réserver un créneau <ArrowRight size={16} />
                </Link>
                <Link href="#tarifs" className="btn-outline">
                  Consulter les tarifs
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://www.tep-sport.com/images/padel1.jpg"
                alt="Terrain de Padel TEP Sport"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info specs */}
      <section className="py-16 px-6 bg-black/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Créneaux de 1h30</h3>
              <p className="text-sm text-white/60">Le format idéal pour un échauffement, un match serré et un retour au calme.</p>
            </div>
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
                <Trophy size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Structure Panoramique</h3>
              <p className="text-sm text-white/60">Terrain sans montants d'angle pour une visibilité totale et un confort de jeu inégalé.</p>
            </div>
            <div className="glass-card p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Jusqu'à 4 joueurs</h3>
              <p className="text-sm text-white/60">Affrontez vos partenaires en double. Idéal pour s'amuser à tous les âges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Tarifs</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Formules Padel</h2>
            <p className="text-white/60">
              Des tarifs clairs et accessibles pour tous, sans frais d'adhésion annuels requis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {prices.map((price, idx) => (
              <div key={idx} className="glass-card p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 relative">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">{price.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-black text-white">{price.price}</span>
                    <span className="text-cyan-400 font-extrabold ml-1">€</span>
                  </div>
                  <p className="text-xs text-white/50">{price.detail}</p>
                  
                  <div className="w-full h-px bg-white/5" />

                  <ul className="space-y-3">
                    {price.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link href="/reserver" className="btn-primary w-full text-center py-2.5 text-sm">
                    Réserver
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
