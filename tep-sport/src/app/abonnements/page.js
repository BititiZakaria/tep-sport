'use client';

import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Check, HelpCircle } from 'lucide-react';
import styles from './Abonnements.module.css'; // Importation du CSS Module

export default function Abonnements() {
  const { abonnements } = useData();

  const FAQs = [
    { q: "Y a-t-il des frais d'inscription ?", a: "Non, chez TEP SPORT, nous ne facturons aucuns frais d'inscription ou de dossier. Vous ne payez que le prix de votre formule." },
    { q: 'Puis-je résilier à tout moment ?', a: 'Nos formules Accès Libre et Standard sont sans engagement et résiliables à tout moment avant la fin de la période en cours. La formule Premium comporte un engagement minimum de 6 mois.' },
    { q: 'Comment réserver les séances de coaching ?', a: 'Toutes les séances de coaching (comprises dans Standard ou Premium) se réservent en ligne via votre espace membre dans l\'onglet "Réserver".' },
    { q: 'Puis-je essayer avant de m\'abonner ?', a: 'Tout à fait ! Nous proposons une séance d\'essai gratuite pour découvrir le centre, nos équipements et faire connaissance avec l\'équipe.' }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <span className={styles.heroTag}>Formules</span>
          <h1 className={styles.heroTitle}>
            Nos <span className="gradient-text-animated">Abonnements</span>
          </h1>
          <p className={styles.heroText}>
            Choisissez la formule adaptée à votre rythme de pratique, à vos objectifs et à votre budget.
          </p>
          <div className={styles.heroDivider} />
        </div>
      </section>

      {/* Pricing Grid */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.pricingGrid}>
            {abonnements.map((sub) => (
              <div
                key={sub.id}
                className={`${styles.card} ${sub.popular ? styles.cardPopular : styles.cardNormal}`}
              >
                {sub.popular && (
                  <span className={styles.popularBadge}>
                    Recommandé
                  </span>
                )}

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3>{sub.name}</h3>
                    <p>{sub.description}</p>
                  </div>

                  <div className={styles.priceBlock}>
                    <span className={styles.priceNumber}>{sub.price}</span>
                    <span className={styles.priceCurrency}>€</span>
                    <span className={styles.pricePeriod}>{sub.period}</span>
                  </div>

                  <div className={styles.divider} />

                  <ul className={styles.featuresList}>
                    {sub.features.map((feat, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <span className={styles.checkWrapper}>
                          <Check size={12} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.actionWrapper}>
                  <Link
                    href="/reserver"
                    className={`${styles.btn} ${sub.popular ? styles.btnPopular : styles.btnNormal}`}
                  >
                    Choisir cette formule
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <span className={styles.heroTag}>Aide</span>
            <h2 className={styles.faqTitle}>Questions fréquentes</h2>
          </div>

          <div className={styles.faqGrid}>
            {FAQs.map((faq, i) => (
              <div key={i} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>
                  <HelpCircle size={18} className={styles.faqIcon} />
                  {faq.q}
                </h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}