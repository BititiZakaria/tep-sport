'use client';

import { useData } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Users, Ticket, ChevronRight } from 'lucide-react';
import styles from './Evenements.module.css';

export default function Evenements() {
  const { events = [] } = useData() || {};

  return (
    <div className={styles.tepPage}>

      {/* ── Hero ── */}
      <section className={styles.tepHero}>
        <div className={styles.tepHeroEyebrow}>Stages &amp; Tournois</div>
        <h1>Événements <em>TEP Sport</em></h1>
        <p className={styles.tepHeroSub}>
          Rejoignez nos événements, tournois et stages thématiques pour booster vos performances et vivre des moments de sport intenses.
        </p>
        <div className={styles.tepHeroStats}>
          <div className={styles.tepStat}>
            <span className={styles.tepStatNum}>{events.length}</span>
            <span className={styles.tepStatLabel}>Événements</span>
          </div>
          <div className={styles.tepStat}>
            <span className={styles.tepStatNum}>
              {events.reduce((acc, e) => acc + (e.spotsLeft || 0), 0)}
            </span>
            <span className={styles.tepStatLabel}>Places disponibles</span>
          </div>
          <div className={styles.tepStat}>
            <span className={styles.tepStatNum}>
              {[...new Set(events.map((e) => e.category))].length}
            </span>
            <span className={styles.tepStatLabel}>Catégories</span>
          </div>
        </div>
      </section>

      {/* ── Events Grid ── */}
      <div className={styles.tepGridSection}>
        <div className={styles.tepSectionHeader}>
          <span className={styles.tepSectionTitle}>Prochains événements</span>
          <span className={styles.tepSectionCount}>{events.length} événement{events.length !== 1 ? 's' : ''}</span>
        </div>

        <div className={styles.tepGrid}>
          {events.length === 0 ? (
            <div className={styles.tepEmpty}>
              <div className={styles.tepEmptyIcon}>📅</div>
              <h3>Aucun événement planifié</h3>
              <p>Revenez bientôt pour découvrir nos prochains stages et tournois.</p>
            </div>
          ) : (
            events.map((evt) => {
              const isLow = evt.spotsLeft <= Math.round(evt.spots * 0.2);

              return (
                <div key={evt.id} className={styles.tepCard}>
                  {/* Image */}
                  <div className={styles.tepCardImage}>
                    {evt.image ? (
                      <Image
                        src={evt.image}
                        alt={evt.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Pas d'image</div>
                    )}
                    <span className={styles.tepCardBadge}>{evt.category}</span>
                    <span className={styles.tepCardSpots}>
                      <span className={`${styles.tepCardSpotsDot} ${isLow ? styles.tepCardSpotsDotLow : ''}`} />
                      {evt.spotsLeft} place{evt.spotsLeft !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Body */}
                  <div className={styles.tepCardBody}>
                    <h3 className={styles.tepCardTitle}>{evt.title}</h3>
                    <p className={styles.tepCardDesc}>{evt.description}</p>

                    <div className={styles.tepCardMeta}>
                      <div className={styles.tepCardMetaRow}>
                        <Calendar size={13} />
                        <span>
                          {evt.date ? new Date(evt.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }) : 'Date à venir'}
                        </span>
                      </div>
                      <div className={styles.tepCardMetaRow}>
                        <Clock size={13} />
                        <span>{evt.time}</span>
                      </div>
                      <div className={styles.tepCardMetaRow}>
                        <Users size={13} />
                        <span>
                          {evt.spots - evt.spotsLeft} / {evt.spots} inscrits
                          {isLow && (
                            <strong style={{ color: '#f97316', marginLeft: 6 }}>
                              — Dernières places !
                            </strong>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={styles.tepCardFooter}>
                    <Link href="/reserver" className={styles.tepBtnPrimary}>
                      <Ticket size={15} />
                      S'inscrire à l'événement
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <section className={styles.tepCta}>
        <h2>
          Prêt à rejoindre<br />
          <span>l'aventure TEP Sport ?</span>
        </h2>
        <p>
          Réservez votre place dès maintenant et vivez une expérience sportive encadrée par des professionnels.
        </p>
        <Link href="/reserver" className={styles.tepCtaLink}>
          Réserver maintenant <ChevronRight size={18} />
        </Link>
      </section>

    </div>
  );
}