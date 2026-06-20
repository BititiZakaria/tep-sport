'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, AlertTriangle, ArrowLeft, XCircle, Plus } from 'lucide-react';
import styles from './ClientReservations.module.css'; // Import des styles isolés

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
      <div className={styles.loaderOverlay}>
        <div className={styles.spinner} />
      </div>
    );
  }

  const clientReservations = reservations.filter(r => r.userId === user.id);
  const clientSeances = seances.filter(s => s.clientId === user.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Confirmé
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            En attente
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
            Annulé
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Glow de fond subtil */}
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>

        {/* Top Navigation */}
        <div className={styles.topNav}>
          <Link href="/client/dashboard" className={styles.backLink}>
            <ArrowLeft size={16} />
            Retour au tableau de bord
          </Link>
          <Link href="/reserver" className={styles.newReservationBtn}>
            <Plus size={16} strokeWidth={2.5} />
            Nouvelle réservation
          </Link>
        </div>

        {/* Header Title */}
        <div className={styles.headerTitleBlock}>
          <h1 className={styles.mainTitle}>
            Mes Réservations
          </h1>
          <p className={styles.subtitle}>
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
            <span className={`${styles.badge} ${activeTab === 'padel' ? styles.badgeActive : styles.badgeInactive}`}>
              {clientReservations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('coaching')}
            className={`${styles.tabButton} ${activeTab === 'coaching' ? styles.tabActive : styles.tabInactive}`}
          >
            <Dumbbell size={16} />
            Coaching
            <span className={`${styles.badge} ${activeTab === 'coaching' ? styles.badgeActive : styles.badgeInactive}`}>
              {clientSeances.length}
            </span>
          </button>
        </div>

        {/* Lists Container */}
        <div className={styles.listWrapper}>
          {activeTab === 'padel' ? (
            clientReservations.length > 0 ? (
              <div className={styles.cardsGrid}>
                {clientReservations.map((res) => (
                  <div key={res.id} className={styles.card}>
                    <div className={styles.cardMainInfo}>
                      <div className={styles.iconContainer}>
                        <Trophy size={22} />
                      </div>
                      <div className={styles.textContainer}>
                        <h3 className={styles.itemTitle}>{res.court}</h3>
                        <div className={styles.metadataFlex}>
                          <span className={styles.metaItem}>
                            <Calendar size={14} className={styles.metaIcon} /> {res.date}
                          </span>
                          <span className={styles.divider} />
                          <span className={styles.metaItem}>
                            <Clock size={14} className={styles.metaIcon} /> {res.startTime} - {res.endTime}
                          </span>
                          <span className={styles.divider} />
                          <span className={styles.inlineBadge}>{res.players} joueurs</span>
                        </div>
                        {res.notes && (
                          <p className={styles.notesBlock}>
                            Note : {res.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={styles.cardActionBlock}>
                      {getStatusBadge(res.status)}
                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous vraiment annuler ce créneau ?')) {
                              cancelReservation(res.id);
                            }
                          }}
                          className={styles.cancelActionBtn}
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
              <div className={styles.cardsGrid}>
                {clientSeances.map((seance) => (
                  <div key={seance.id} className={styles.card}>
                    <div className={styles.cardMainInfo}>
                      <div className={styles.iconContainer}>
                        <Dumbbell size={22} />
                      </div>
                      <div className={styles.textContainer}>
                        <h3 className={styles.itemTitle}>{seance.type}</h3>
                        <div className={styles.metadataFlex}>
                          <span className={styles.metaItem}>
                            <Calendar size={14} className={styles.metaIcon} /> {seance.date}
                          </span>
                          <span className={styles.divider} />
                          <span className={styles.metaItem}>
                            <Clock size={14} className={styles.metaIcon} /> {seance.startTime} - {seance.endTime}
                          </span>
                          <span className={styles.divider} />
                          <span className={styles.coachingBadge}>Coach : {seance.coach}</span>
                        </div>
                        {seance.notes && (
                          <p className={styles.notesBlock}>
                            Note : {seance.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={styles.cardActionBlock}>
                      {getStatusBadge(seance.status)}
                      {seance.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous vraiment annuler cette séance ?')) {
                              cancelSeance(seance.id);
                            }
                          }}
                          className={styles.cancelActionBtn}
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

        {/* Cancellation warning callout */}
        <div className={styles.policyCallout}>
          <AlertTriangle size={20} className={styles.policyIcon} />
          <div className={styles.policyContent}>
            <h5 className={styles.policyTitle}>Politique d'annulation</h5>
            <p className={styles.policyText}>
              Conformément à nos conditions générales de vente, toute réservation de padel ou séance de coaching doit être annulée au minimum <strong>24 heures à l'avance</strong> pour être recréditée sur votre compte.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}