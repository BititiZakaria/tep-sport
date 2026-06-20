'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, Award, ArrowRight, LogOut } from 'lucide-react';
import styles from './ClientDashboard.module.css'; // Importation du CSS Module

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
    <div className={styles.pageContainer}>
      <div className={styles.mainWrapper}>

        {/* Welcome Header */}
        <div className={styles.welcomeHeader}>
          <div className={styles.glow} />

          <div className={styles.profileSection}>
            <div className={styles.avatar}>
              {user.name.charAt(0)}
            </div>
            <div className={styles.headerText}>
              <h1 className={styles.welcomeTitle}>Bonjour, {user.name}</h1>
              <p className={styles.subscriptionInfo}>
                <Award size={14} className={styles.cyanText} /> Membre Formule <span className={styles.cyanText}>{user.subscription}</span>
              </p>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Link href="/reserver" className={styles.bookButton}>
              Réserver une séance
            </Link>
            <button onClick={logout} className={styles.logoutButton}>
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>

        {/* Dashboard Grid (Stats cards) */}
        <div className={styles.statsGrid}>
          {/* Padel Stats Card */}
          <div className={styles.statCard}>
            <div>
              <h3 className={styles.statCardTitle}>Padel</h3>
              <p className={styles.statCardDesc}>Vos réservations de terrain de Padel confirmées.</p>
            </div>
            <div className={styles.counterRow}>
              <span className={styles.bigNumber}>{clientReservations.filter(r => r.status === 'confirmed').length}</span>
              <span className={styles.unitText}>sessions</span>
            </div>
            <Link href="/client/reservations" className={styles.cardActionLink}>
              Gérer mes réservations <ArrowRight size={12} />
            </Link>
          </div>

          {/* Coaching Stats Card */}
          <div className={styles.statCard}>
            <div>
              <h3 className={styles.statCardTitle}>Coaching</h3>
              <p className={styles.statCardDesc}>Séances d'entraînement encadrées par Yoan.</p>
            </div>
            <div className={styles.counterRow}>
              <span className={styles.bigNumber}>{clientSeances.filter(s => s.status === 'confirmed').length}</span>
              <span className={styles.unitText}>séances</span>
            </div>
            <Link href="/client/reservations" className={styles.cardActionLink}>
              Voir mon historique <ArrowRight size={12} />
            </Link>
          </div>

          {/* Profile Status Card */}
          <div className={styles.statCard}>
            <div>
              <h3 className={styles.statCardTitle}>Statut profil</h3>
              <p className={styles.statCardDesc}>Validité et facturation de votre formule TEP Sport.</p>
            </div>
            <div className={styles.counterRow}>
              <span className={styles.statusBadge}>Actif</span>
            </div>
            <span className={styles.dateHint}>Prochain prélèvement le 01/07</span>
          </div>
        </div>

        {/* Bookings Details Blocks */}
        <div className={styles.detailsGrid}>

          {/* Upcoming Padel Sessions */}
          <div className={styles.detailsBlock}>
            <h3 className={styles.detailsBlockTitle}>
              <Trophy className={styles.cyanText} size={20} /> Prochains matchs de Padel
            </h3>

            {upcomingPadel.length > 0 ? (
              <div className={styles.activitiesList}>
                {upcomingPadel.map((res) => (
                  <div key={res.id} className={styles.activityRow}>
                    <div className={styles.activityDetails}>
                      <div className={styles.activityName}>{res.court}</div>
                      <div className={styles.metaItem}>
                        <Calendar size={12} /> {res.date}
                      </div>
                      <div className={styles.metaItem}>
                        <Clock size={12} /> {res.startTime} - {res.endTime}
                      </div>
                    </div>
                    <span className={styles.labelBadge}>
                      {res.players} joueurs
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyText}>
                Aucun match de padel programmé.
                <div className={styles.emptyLinkWrapper}>
                  <Link href="/reserver" className={styles.emptyLink}>
                    Réserver un terrain
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Coaching Sessions */}
          <div className={styles.detailsBlock}>
            <h3 className={styles.detailsBlockTitle}>
              <Dumbbell className={styles.cyanText} size={20} /> Prochaines séances de Coaching
            </h3>

            {upcomingCoaching.length > 0 ? (
              <div className={styles.activitiesList}>
                {upcomingCoaching.map((s) => (
                  <div key={s.id} className={styles.activityRow}>
                    <div className={styles.activityDetails}>
                      <div className={styles.activityName}>{s.type}</div>
                      <div className={styles.metaItem}>
                        <Calendar size={12} /> {s.date}
                      </div>
                      <div className={styles.metaItem}>
                        <Clock size={12} /> {s.startTime} - {s.endTime}
                      </div>
                    </div>
                    <span className={styles.labelBadge}>
                      Coach : {s.coach}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyText}>
                Aucune séance de coaching programmée.
                <div className={styles.emptyLinkWrapper}>
                  <Link href="/reserver" className={styles.emptyLink}>
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