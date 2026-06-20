'use client';

import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Trophy, Dumbbell, Users, Mail, ChevronRight } from 'lucide-react';
import styles from './AdminDashboard.module.css'; // Liaison exclusive des styles modules

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
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.headerBlock}>
        <h1 className={styles.pageTitle}>Tableau de bord</h1>
        <p className={styles.pageSubtitle}>Vue d'ensemble des activités et statistiques du centre.</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statName}>{stat.name}</span>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
            <div className={styles.iconContainer}>
              {stat.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Grid columns */}
      <div className={styles.mainGrid}>

        {/* Recent Padel bookings */}
        <div className={styles.glassCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Trophy size={18} className="text-cyan-400" /> Dernières réservations Padel
            </h3>
            <Link href="/admin/reservations" className={styles.seeAllLink}>
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>

          <div className={styles.itemsList}>
            {recentReservations.map((res) => (
              <div key={res.id} className={styles.listItemRow}>
                <div className={styles.itemMetadata}>
                  <span className={styles.itemMainName}>{res.userName}</span>
                  <div className={styles.itemSubDetails}>
                    <span>{res.date}</span>
                    <span>{res.startTime} - {res.endTime}</span>
                  </div>
                </div>
                <span className={`${styles.statusBadge} ${res.status === 'confirmed' ? styles.statusConfirmed : (
                    res.status === 'pending' ? styles.statusPending : styles.statusCancelled
                  )
                  }`}>
                  {res.status === 'confirmed' ? 'Confirmé' : (res.status === 'pending' ? 'En attente' : 'Annulé')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Coaching */}
        <div className={styles.glassCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Dumbbell size={18} className="text-cyan-400" /> Prochaines séances de coaching
            </h3>
            <Link href="/admin/seances" className={styles.seeAllLink}>
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>

          <div className={styles.itemsList}>
            {upcomingCoaching.map((s) => (
              <div key={s.id} className={styles.listItemRow}>
                <div className={styles.itemMetadata}>
                  <span className={styles.itemMainName}>{s.clientName}</span>
                  <div className={styles.itemSubDetails}>
                    <span>{s.date}</span>
                    <span>{s.startTime} - {s.endTime}</span>
                  </div>
                  <p className={styles.sessionType}>{s.type}</p>
                </div>
                <span className={styles.coachNameTag}>
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