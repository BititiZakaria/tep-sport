'use client';

import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { User, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import styles from './CoursCollectifs.module.css'; // Liaison exclusive des styles modules

export default function CoursCollectifs() {
  const { coursCollectifs } = useData();

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <span className={styles.tagline}>Prestations</span>
          <h1 className={styles.mainTitle}>
            Cours <span className="gradient-text-animated">Collectifs</span>
          </h1>
          <p className={styles.descriptionHero}>
            Des séances en petit groupe, encadrées par nos coachs certifiés, pour allier motivation collective et suivi technique individualisé.
          </p>
          <div className={styles.divider} />
          <div className={styles.actionWrapper}>
            <Link href="/reserver" className={styles.btnPrimaryCustom}>
              Réserver un cours collectifs
            </Link>
          </div>
        </div>
      </section>

      {/* Class list Section */}
      <section className={styles.classListSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.tagline}>Planning & Formats</span>
            <h2 className={styles.sectionTitle}>Nos formats de cours</h2>
            <p className={styles.sectionSubtitle}>
              Des sessions limitées en places pour garantir la qualité de l'encadrement technique.
            </p>
          </div>

          <div className={styles.coursesGrid}>
            {coursCollectifs.map((cours) => (
              <div key={cours.id} className={styles.courseCard}>
                <div className={styles.cardInner}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.courseNameBadge}>
                      {cours.name}
                    </span>
                    <span className={styles.timeTag}>
                      <Clock size={12} /> {cours.time}
                    </span>
                  </div>

                  <h3 className={styles.courseDay}>
                    {cours.day}
                  </h3>

                  <p className={styles.courseDescription}>
                    {cours.description}
                  </p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.coachInfo}>
                    <User size={14} className="text-cyan-400" /> Coach: {cours.coach}
                  </span>
                  <span className={styles.spotsInfo}>
                    <CheckCircle2 size={14} className="text-emerald-400" /> {cours.spots} places max
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Info */}
      <section className={styles.rulesSection}>
        <div className={styles.rulesContainer}>
          <div className={styles.warningBox}>
            <div className={styles.warningIconWrapper}>
              <ShieldAlert className="text-yellow-500" size={24} />
            </div>
            <div className={styles.warningTextContent}>
              <h4 className={styles.warningTitle}>Règles d'accès aux cours collectifs</h4>
              <p className={styles.warningDescription}>
                Afin de garantir un encadrement sécurisé et respectueux pour tous, toute réservation doit être annulée au moins 12 heures à l'avance. Dans le cas contraire, la séance sera comptabilisée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}