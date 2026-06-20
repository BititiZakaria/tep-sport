'use client';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Check, Info, HelpCircle } from 'lucide-react';

export default function Abonnements() {
  const { abonnements } = useData();

  const FAQs = [
    { q: 'Y a-t-il des frais d\'inscription ?', a: 'Non, chez TEP SPORT, nous ne facturons aucuns frais d\'inscription ou de dossier. Vous ne payez que le prix de votre formule.' },
    { q: 'Puis-je résilier à tout moment ?', a: 'Nos formules Accès Libre et Standard sont sans engagement et résiliables à tout moment avant la fin de la période en cours. La formule Premium comporte un engagement minimum de 6 mois.' },
    { q: 'Comment réserver les séances de coaching ?', a: 'Toutes les séances de coaching (comprises dans Standard ou Premium) se réservent en ligne via votre espace membre dans l\'onglet "Réserver".' },
    { q: 'Puis-je essayer avant de m\'abonner ?', a: 'Tout à fait ! Nous proposons une séance d\'essai gratuite pour découvrir le centre, nos équipements et faire connaissance avec l\'équipe.' }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Formules</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Nos <span className="gradient-text-animated">Abonnements</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Choisissez la formule adaptée à votre rythme de pratique, à vos objectifs et à votre budget.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto" />
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {abonnements.map((sub) => (
              <div 
                key={sub.id} 
                className={`glass-card p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  sub.popular ? 'border-cyan-500 scale-[1.03] shadow-cyan-500/10' : 'hover:border-cyan-500/20'
                }`}
              >
                {sub.popular && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Recommandé
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{sub.name}</h3>
                    <p className="text-xs text-white/50">{sub.description}</p>
                  </div>

                  <div className="flex items-baseline">
                    <span className="text-5xl font-black text-white">{sub.price}</span>
                    <span className="text-2xl font-bold text-cyan-400">€</span>
                    <span className="text-sm text-white/40 ml-2">{sub.period}</span>
                  </div>

                  <div className="w-full h-px bg-white/5" />

                  <ul className="space-y-4">
                    {sub.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                          <Check size={12} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-4">
                  <Link 
                    href="/reserver" 
                    className={`w-full text-center py-3 text-sm font-semibold rounded-full block transition-all ${
                      sub.popular 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:scale-105' 
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:scale-105'
                    }`}
                  >
                    Choisir cette formule
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Aide</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Questions fréquentes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FAQs.map((faq, i) => (
              <div key={i} className="glass-card p-6 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle size={18} className="text-cyan-400 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
