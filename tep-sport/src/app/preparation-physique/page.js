'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Target, Users, TrendingUp, Calendar, Trophy } from 'lucide-react';
import styles from './PreparationPhysique.module.css'; // Liaison du CSS Module

export default function PreparationPhysique() {
  const targets = [
    { title: 'Sportifs loisirs', desc: 'Vous pratiquez un sport pour le plaisir et souhaitez progresser avec un encadrement professionnel.', icon: <Users size={24} className="text-cyan-400" /> },
    { title: 'Performance', desc: 'Sportifs individuels ou en club cherchant à optimiser leurs performances en compétition.', icon: <Target size={24} className="text-cyan-400" /> },
    { title: 'Transformation physique', desc: 'Reprise sportive, perte de poids, remise en forme : un programme adapté à vos besoins.', icon: <TrendingUp size={24} className="text-cyan-400" /> },
    { title: 'Réathlétisation', desc: 'Retour de blessure avec un accompagnement sécurisé et une progression maîtrisée.', icon: <Calendar size={24} className="text-cyan-400" /> }
  ];

  const pillars = [
    { num: 1, title: 'Technique', desc: 'Une attention particulière à la technique pour éviter les blessures et optimiser chaque mouvement.' },
    { num: 2, title: 'Régularité', desc: "Création d'habitudes d'entraînement pour un progrès continu et durable dans le temps." },
    { num: 3, title: 'Intensité', desc: "Calcul de charge et d'intensité adapté à vos capacités du jour pour des résultats maximaux." },
    { num: 4, title: 'Planification', desc: 'Cycles de travail structurés avec bilans réguliers pour suivre votre évolution.' }
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Info */}
            <div className={styles.heroLeft}>
              <span className={styles.badgeText}>Prestations</span>
              <h1 className={styles.heroTitle}>
                Préparation<br />
                <span className={styles.gradientTextAnimated}>physique & coaching</span>
              </h1>
              <p className={styles.heroDesc}>
                Un accompagnement personnalisé, construit autour de vos objectifs et de votre rythme, pour vous permettre de progresser de manière efficace et durable.
              </p>
              <div className={styles.decorativeLine} />
              <div className={styles.ctaWrapper}>
                <Link href="/reserver" className={styles.btnPrimary}>
                  Réserver maintenant
                </Link>
                <Link href="/abonnements" className={styles.btnOutline}>
                  Découvrir les formules
                </Link>
              </div>
            </div>

            {/* Right Images Display */}
            <div className={styles.imageFrame}>
              <Image
                src="https://www.tep-sport.com/images/prep1.jpg"
                alt="Coaching physique"
                fill
                className={styles.heroImage}
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Whom section */}
      <section className={styles.bgAlternatedSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badgeText}>Accessibilité</span>
            <h2 className={styles.sectionTitle}>Pour qui ?</h2>
            <p className={styles.sectionSubtitle}>
              Nos séances de coaching s'adaptent à tous les profils et tous les niveaux de pratique.
            </p>
          </div>

          <div className={styles.targetsGrid}>
            {targets.map((target, idx) => (
              <div key={idx} className={styles.glassCard}>
                <div className={styles.targetCardContent}>
                  <div className={styles.iconBox}>
                    {target.icon}
                  </div>
                  <div className={styles.cardTextBlock}>
                    <h3 className={styles.cardTitle}>{target.title}</h3>
                    <p className={styles.cardDesc}>{target.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Pillars */}
      <section className={styles.standardSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badgeText}>Méthodologie</span>
            <h2 className={styles.sectionTitle}>Les 4 Piliers TEP</h2>
            <p className={styles.sectionSubtitle}>
              Une rigueur scientifique et technique au service de votre progression.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar) => (
              <div key={pillar.num} className={styles.pillarCard}>
                <div className={styles.pillarWatermark}>
                  0{pillar.num}
                </div>
                <div className={styles.pillarBadge}>
                  {pillar.num}
                </div>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}