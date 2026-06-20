'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, AlertTriangle, ArrowLeft, XCircle, Plus } from 'lucide-react';
import styles from './ClientReservations.module.css'; // Importation du CSS Module

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
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const clientReservations = reservations.filter(r => r.userId === user.id);
  const clientSeances = seances.filter(s => s.clientId === user.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className={`${styles.statusBadge} ${styles.statusConfirmed}`}>
            <span className={styles.pulseDot} />
            Confirmé
          </span>
        );
      case 'pending':
        return (
          <span className={`${styles.statusBadge} ${styles.statusPending}`}>
            <span className={styles.staticDot} />
            En attente
          </span>
        );
      case 'cancelled':
        return (
          <span className={`${styles.statusBadge} ${styles.statusCancelled}`}>
            Annulé
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Background Decorative Glow */}
      <div className={styles.glow} />

      <div className={styles.mainWrapper}>

        {/* Top Navigation Row */}
        <div className={styles.topNavigation}>
          <Link href="/client/dashboard" className={styles.backLink}>
            <ArrowLeft size={16} className={styles.backIcon} />
            Retour au tableau de bord
          </Link>
          <Link href="/reserver" className={styles.newReservationButton}>
            <Plus size={16} strokeWidth={2.5} />
            Nouvelle réservation
          </Link>
        </div>

        {/* Header Block */}
        <div className={styles.headerBlock}>
          <h1 className={styles.pageTitle}>Mes Réservations</h1>
          <p className={styles.pageSubtitle}>
            Suivez, planifiez et gérez l'ensemble de vos activités au centre.
          </p>
        </div>

        {/* Custom Modern Tabs */}
        <div className={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab('padel')}
            className={`${styles.tabButton} ${activeTab === 'padel' ? styles.tabActive : styles.tabInactive}`}
          >
            <Trophy size={16} />
            Padel
            <span className={`${styles.counterBadge} ${activeTab === 'padel' ? styles.badgeActive : styles.badgeInactive}`}>
              {clientReservations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('coaching')}
            className={`${styles.tabButton} ${activeTab === 'coaching' ? styles.tabActive : styles.tabInactive}`}
          >
            <Dumbbell size={16} />
            Coaching
            <span className={`${styles.counterBadge} ${activeTab === 'coaching' ? styles.badgeActive : styles.badgeInactive}`}>
              {clientSeances.length}
            </span>
          </button>
        </div>

        {/* Dynamic Lists Content Area */}
        <div className={styles.listContainer}>
          {activeTab === 'padel' ? (
            clientReservations.length > 0 ? (
              <div className={styles.grid}>
                {clientReservations.map((res) => (
                  <div key={res.id} className={styles.activityCard}>
                    <div className={styles.leftInfoSection}>
                      <div className={styles.iconWrapper}>
                        <Trophy size={22} />
                      </div>
                      <div className={styles.detailsWrapper}>
                        <h3 className={styles.activityTitle}>{res.court}</h3>
                        <div className={styles.metadataRow}>
                          <span className={styles.metaItem}><Calendar size={14} className={styles.metaIcon} /> {res.date}</span>
                          <span className={styles.metaSeparator} />
                          <span className={styles.metaItem}><Clock size={14} className={styles.metaIcon} /> {res.startTime} - {res.endTime}</span>
                          <span className={styles.metaSeparator} />
                          <span className={styles.playersBadge}>{res.players} joueurs</span>
                        </div>
                        {res.notes && (
                          <p className={styles.noteText}>Note : {res.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className={styles.rightActionsSection}>
                      {getStatusBadge(res.status)}
                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous vraiment annuler ce créneau ?')) {
                              cancelReservation(res.id);
                            }
                          }}
                          className={styles.cancelButton}
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
              <div className={styles.emptyState}>
                <Trophy size={32} className={styles.emptyIcon} />
                Aucune réservation de padel enregistrée.
              </div>
            )
          ) : (
            clientSeances.length > 0 ? (
              <div className={styles.grid}>
                {clientSeances.map((seance) => (
                  <div key={seance.id} className={styles.activityCard}>
                    <div className={styles.leftInfoSection}>
                      <div className={styles.iconWrapper}>
                        <Dumbbell size={22} />
                      </div>
                      <div className={styles.detailsWrapper}>
                        <h3 className={styles.activityTitle}>{seance.type}</h3>
                        <div className={styles.metadataRow}>
                          <span className={styles.metaItem}><Calendar size={14} className={styles.metaIcon} /> {seance.date}</span>
                          <span className={styles.metaSeparator} />
                          <span className={styles.metaItem}><Clock size={14} className={styles.metaIcon} /> {seance.startTime} - {seance.endTime}</span>
                          <span className={styles.metaSeparator} />
                          <span className={styles.coachBadge}>Coach : {seance.coach}</span>
                        </div>
                        {seance.notes && (
                          <p className={styles.noteText}>Note : {seance.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className={styles.rightActionsSection}>
                      {getStatusBadge(seance.status)}
                      {seance.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous vraiment annuler cette séance ?')) {
                              cancelSeance(seance.id);
                            }
                          }}
                          className={styles.cancelButton}
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
              <div className={styles.emptyState}>
                <Dumbbell size={32} className={styles.emptyIcon} />
                Aucune séance de coaching enregistrée.
              </div>
            )
          )}
        </div>

        {/* Cancellation Warning Callout Box */}
        <div className={styles.warningCallout}>
          <AlertTriangle size={20} className={styles.warningIcon} />
          <div className={styles.warningContent}>
            <h5 className={styles.warningTitle}>Politique d'annulation</h5>
            <p className={styles.warningText}>
              Conformément à nos conditions générales de vente, toute réservation de padel ou séance de coaching doit être annulée au minimum <strong className={styles.warningHighlight}>24 heures à l'avance</strong> pour être recréditée sur votre compte.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}