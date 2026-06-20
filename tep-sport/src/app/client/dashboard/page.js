'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, User, Award, ShieldAlert, ArrowRight, LogOut } from 'lucide-react';

export default function ClientDashboard() {
  const { user, logout, loading } = useAuth();
  const { reservations, seances } = useData();
  const router = useRouter();

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

  // Filter reservations and seances for this logged in client
  const clientReservations = reservations.filter(r => r.userId === user.id);
  const clientSeances = seances.filter(s => s.clientId === user.id);

  // Get upcoming events
  const upcomingPadel = clientReservations.filter(r => r.status === 'confirmed' && new Date(r.date) >= new Date()).slice(0, 2);
  const upcomingCoaching = clientSeances.filter(s => s.status === 'confirmed' && new Date(s.date) >= new Date()).slice(0, 2);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl space-y-8 animate-fade-in-up">
        
        {/* Welcome Header */}
        <div className="glass-card p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-2xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Bonjour, {user.name}</h1>
              <p className="text-sm text-white/50 flex items-center gap-1.5 justify-center sm:justify-start">
                <Award size={14} className="text-cyan-400" /> Membre Formule <span className="text-cyan-400 font-bold">{user.subscription}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/reserver" className="btn-primary py-2 px-5 text-sm">
              Réserver une séance
            </Link>
            <button
              onClick={logout}
              className="btn-outline py-2 px-5 text-sm flex items-center gap-1 text-red-400 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40"
            >
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Padel</h3>
              <p className="text-sm text-white/50">Vos réservations de terrain de Padel confirmées.</p>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-black text-cyan-400">{clientReservations.filter(r => r.status === 'confirmed').length}</span>
              <span className="text-sm text-white/40">sessions</span>
            </div>
            <Link href="/client/reservations" className="text-xs text-cyan-400 font-bold mt-4 flex items-center gap-1 hover:underline">
              Gérer mes réservations <ArrowRight size={12} />
            </Link>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Coaching</h3>
              <p className="text-sm text-white/50">Séances d'entraînement encadrées par Yoan.</p>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-black text-cyan-400">{clientSeances.filter(s => s.status === 'confirmed').length}</span>
              <span className="text-sm text-white/40">séances</span>
            </div>
            <Link href="/client/reservations" className="text-xs text-cyan-400 font-bold mt-4 flex items-center gap-1 hover:underline">
              Voir mon historique <ArrowRight size={12} />
            </Link>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Statut profil</h3>
              <p className="text-sm text-white/50">Validité et facturation de votre formule TEP Sport.</p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-full uppercase tracking-wider">
                Actif
              </span>
            </div>
            <span className="text-xs text-white/40 mt-4 block">Prochain prélèvement le 01/07</span>
          </div>
        </div>

        {/* Bookings details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Padel Sessions */}
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-cyan-400" size={20} /> Prochains matchs de Padel
            </h3>
            
            {upcomingPadel.length > 0 ? (
              <div className="space-y-4">
                {upcomingPadel.map((res) => (
                  <div key={res.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-bold text-white">{res.court}</div>
                      <div className="text-xs text-white/50 flex items-center gap-1">
                        <Calendar size={12} /> {res.date}
                      </div>
                      <div className="text-xs text-white/50 flex items-center gap-1">
                        <Clock size={12} /> {res.startTime} - {res.endTime}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {res.players} joueurs
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/40 text-sm">
                Aucun match de padel programmé.
                <div className="pt-3">
                  <Link href="/reserver" className="text-cyan-400 font-bold hover:underline">
                    Réserver un terrain
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Coaching */}
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Dumbbell className="text-cyan-400" size={20} /> Prochaines séances de Coaching
            </h3>
            
            {upcomingCoaching.length > 0 ? (
              <div className="space-y-4">
                {upcomingCoaching.map((s) => (
                  <div key={s.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-bold text-white">{s.type}</div>
                      <div className="text-xs text-white/50 flex items-center gap-1">
                        <Calendar size={12} /> {s.date}
                      </div>
                      <div className="text-xs text-white/50 flex items-center gap-1">
                        <Clock size={12} /> {s.startTime} - {s.endTime}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Coach : {s.coach}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/40 text-sm">
                Aucune séance de coaching programmée.
                <div className="pt-3">
                  <Link href="/reserver" className="text-cyan-400 font-bold hover:underline">
                    Réserver une séance
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
