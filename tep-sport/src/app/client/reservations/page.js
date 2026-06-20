'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, AlertTriangle, ArrowLeft, XCircle } from 'lucide-react';

export default function ClientReservations() {
  const { user, loading } = useAuth();
  const { reservations, seances, cancelReservation, cancelSeance } = useData();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('padel'); // padel, coaching

  useEffect(() => {
    if (!loading && !user) {
      router.push('/client/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const clientReservations = reservations.filter(r => r.userId === user.id);
  const clientSeances = seances.filter(s => s.clientId === user.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="status-badge status-confirmed">Confirmé</span>;
      case 'pending':
        return <span className="status-badge status-pending">En attente</span>;
      case 'cancelled':
        return <span className="status-badge status-cancelled">Annulé</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-8 animate-fade-in-up">
        
        {/* Navigation back */}
        <div className="flex justify-between items-center">
          <Link href="/client/dashboard" className="text-white/60 hover:text-cyan-400 flex items-center gap-1.5 text-sm transition-colors">
            <ArrowLeft size={16} /> Retour au tableau de bord
          </Link>
          <Link href="/reserver" className="btn-primary py-2 px-4 text-xs">
            Nouvelle réservation
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Mes Réservations</h1>
          <p className="text-sm text-white/50">Gérez l'ensemble de vos créneaux réservés.</p>
        </div>

        {/* Tabs switcher */}
        <div className="flex border-b border-white/10 gap-6">
          <button
            onClick={() => setActiveTab('padel')}
            className={`pb-3 text-sm font-semibold relative transition-all ${
              activeTab === 'padel' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-white/50 hover:text-white'
            }`}
          >
            Padel ({clientReservations.length})
          </button>
          <button
            onClick={() => setActiveTab('coaching')}
            className={`pb-3 text-sm font-semibold relative transition-all ${
              activeTab === 'coaching' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-white/50 hover:text-white'
            }`}
          >
            Coaching ({clientSeances.length})
          </button>
        </div>

        {/* Content lists */}
        <div className="space-y-4">
          {activeTab === 'padel' ? (
            clientReservations.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {clientReservations.map((res) => (
                  <div key={res.id} className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/5">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <Trophy size={20} />
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-white text-lg">{res.court}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {res.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {res.startTime} - {res.endTime}</span>
                          <span>• {res.players} joueurs</span>
                        </div>
                        {res.notes && <p className="text-xs text-white/40 italic">Note: {res.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      {getStatusBadge(res.status)}
                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous vraiment annuler ce créneau ?')) {
                              cancelReservation(res.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-full transition-all"
                          title="Annuler le créneau"
                        >
                          <XCircle size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 text-sm">
                Aucune réservation de padel enregistrée.
              </div>
            )
          ) : (
            clientSeances.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {clientSeances.map((seance) => (
                  <div key={seance.id} className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/5">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <Dumbbell size={20} />
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-white text-lg">{seance.type}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {seance.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {seance.startTime} - {seance.endTime}</span>
                          <span>• Coach : {seance.coach}</span>
                        </div>
                        {seance.notes && <p className="text-xs text-white/40 italic">Note: {seance.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      {getStatusBadge(seance.status)}
                      {seance.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous vraiment annuler cette séance ?')) {
                              cancelSeance(seance.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-full transition-all"
                          title="Annuler la séance"
                        >
                          <XCircle size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 text-sm">
                Aucune séance de coaching enregistrée.
              </div>
            )
          )}
        </div>

        {/* Cancellation warning callout */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/2 flex items-center gap-3">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0" />
          <p className="text-xs text-white/50 leading-relaxed">
            Rappel : Conformément à nos conditions générales de vente, toute réservation de padel ou séance de coaching doit être annulée au minimum 24h à l'avance pour être recréditée.
          </p>
        </div>

      </div>
    </div>
  );
}
