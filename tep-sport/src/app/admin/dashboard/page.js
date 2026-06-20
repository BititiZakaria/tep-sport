'use client';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Trophy, Dumbbell, Users, Mail, Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const { users, reservations, seances, emails } = useData();

  // Stats calculation
  const totalPadel = reservations.filter(r => r.status === 'confirmed').length;
  const totalCoaching = seances.filter(s => s.status === 'confirmed').length;
  const activeMembers = users.filter(u => u.status === 'active').length;
  const sentMails = emails.length;

  const stats = [
    { name: 'Réservations Padel', value: totalPadel, icon: <Trophy size={20} className="text-cyan-400" />, href: '/admin/reservations' },
    { name: 'Séances Coaching', value: totalCoaching, icon: <Dumbbell size={20} className="text-cyan-400" />, href: '/admin/seances' },
    { name: 'Membres Actifs', value: activeMembers, icon: <Users size={20} className="text-cyan-400" />, href: '/admin/users' },
    { name: 'Emails Envoyés', value: sentMails, icon: <Mail size={20} className="text-cyan-400" />, href: '/admin/mailing' }
  ];

  // Get recent 4 padel reservations
  const recentReservations = [...reservations].reverse().slice(0, 4);
  // Get upcoming 4 coaching sessions
  const upcomingCoaching = seances.filter(s => s.status === 'confirmed' && new Date(s.date) >= new Date()).slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Tableau de bord</h1>
        <p className="text-sm text-white/50">Vue d'ensemble des activités et statistiques du centre.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="stat-card flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-white/55 font-semibold uppercase tracking-wider">{stat.name}</span>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              {stat.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Padel bookings */}
        <div className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy size={18} className="text-cyan-400" /> Dernières réservations Padel
            </h3>
            <Link href="/admin/reservations" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentReservations.map((res) => (
              <div key={res.id} className="flex justify-between items-center p-3.5 bg-white/5 rounded-lg border border-white/5">
                <div className="space-y-1">
                  <span className="font-bold text-sm text-white">{res.userName}</span>
                  <div className="text-xs text-white/40 flex items-center gap-3">
                    <span>{res.date}</span>
                    <span>{res.startTime} - {res.endTime}</span>
                  </div>
                </div>
                <span className={`status-badge text-[10px] ${
                  res.status === 'confirmed' ? 'status-confirmed' : (
                    res.status === 'pending' ? 'status-pending' : 'status-cancelled'
                  )
                }`}>
                  {res.status === 'confirmed' ? 'Confirmé' : (res.status === 'pending' ? 'En attente' : 'Annulé')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Coaching */}
        <div className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Dumbbell size={18} className="text-cyan-400" /> Prochaines séances de coaching
            </h3>
            <Link href="/admin/seances" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingCoaching.map((s) => (
              <div key={s.id} className="flex justify-between items-center p-3.5 bg-white/5 rounded-lg border border-white/5">
                <div className="space-y-1">
                  <span className="font-bold text-sm text-white">{s.clientName}</span>
                  <div className="text-xs text-white/40 flex items-center gap-3">
                    <span>{s.date}</span>
                    <span>{s.startTime} - {s.endTime}</span>
                  </div>
                  <p className="text-[10px] text-cyan-400 font-semibold">{s.type}</p>
                </div>
                <span className="text-xs text-white/50 font-medium">
                  Coach: {s.coach}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
