'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, Waves, Users, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import styles from './Reserver.module.css'; // Import du CSS Module

export default function Reserver() {
  const { user } = useAuth();
  const { addReservation, addSeance } = useData();

  // Booking states
  const [selectedService, setSelectedService] = useState('padel'); // padel, coaching, recuperation
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [padelPlayers, setPadelPlayers] = useState('4');
  const [coachingType, setCoachingType] = useState('Préparation physique');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    if (selectedService === 'padel') {
      const padelEnd = bookingTime === '18:00' ? '19:30' : (
        bookingTime === '09:00' ? '10:30' : '12:00'
      );
      addReservation({
        userId: user.id,
        userName: user.name,
        date: bookingDate,
        startTime: bookingTime,
        endTime: padelEnd,
        court: 'Terrain 1',
        players: parseInt(padelPlayers),
        notes: notes
      });
    } else {
      const coachingEnd = bookingTime === '08:00' ? '09:00' : '11:00';
      addSeance({
        coach: 'Yoan',
        clientId: user.id,
        clientName: user.name,
        date: bookingDate,
        startTime: bookingTime,
        endTime: coachingEnd,
        type: coachingType,
        notes: notes
      });
    }

    setBookingSuccess(true);
    setBookingDate('');
    setNotes('');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className={styles.reserverPage}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <span className={styles.heroEyebrow}>Réservation</span>
        <h1 className={styles.heroTitle}>
          Réservez votre <span className="gradient-text-animated">Séance</span>
        </h1>
        <p className={styles.heroDescription}>
          Padel, préparation physique, coaching personnalisé ou récupération. Choisissez votre formule et réservez votre créneau en ligne.
        </p>
      </section>

      {/* Main Reservation Section */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.gridContainer}>

            {/* Booking Form or Login Prompt */}
            <div className={styles.formColumn}>
              {user ? (
                <div className={styles.glassCard}>
                  <h2 className={styles.cardTitle}>
                    <Calendar className={styles.cardTitleIcon} /> Formulaire de Réservation
                  </h2>

                  {bookingSuccess ? (
                    <div className={styles.successAlert}>
                      <div className={styles.successIconWrapper}>
                        <CheckCircle2 size={28} />
                      </div>
                      <h3 className={styles.successTitle}>Réservation validée !</h3>
                      <p className={styles.successText}>
                        Votre réservation a bien été enregistrée. Retrouvez-la dans votre espace client.
                      </p>
                      <div className={styles.successButtons}>
                        <Link href="/client/reservations" className={styles.btnPrimaryInline}>
                          Mes Réservations
                        </Link>
                        <button
                          onClick={() => setBookingSuccess(false)}
                          className={styles.btnOutline}
                        >
                          Nouvelle réservation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                      {/* Service selector */}
                      <div className={styles.formGridGroup}>
                        <label className={styles.formLabel}>1. Choisissez le service</label>
                        <div className={styles.serviceGrid}>
                          <button
                            type="button"
                            onClick={() => { setSelectedService('padel'); setBookingTime('09:00'); }}
                            className={`${styles.serviceButton} ${selectedService === 'padel' ? styles.serviceButtonActive : ''}`}
                          >
                            <Trophy size={20} />
                            <span className={styles.serviceButtonLabel}>Terrain de Padel</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSelectedService('coaching'); setBookingTime('08:00'); }}
                            className={`${styles.serviceButton} ${selectedService === 'coaching' ? styles.serviceButtonActive : ''}`}
                          >
                            <Dumbbell size={20} />
                            <span className={styles.serviceButtonLabel}>Coaching &amp; Force</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSelectedService('recuperation'); setBookingTime('10:00'); }}
                            className={`${styles.serviceButton} ${selectedService === 'recuperation' ? styles.serviceButtonActive : ''}`}
                          >
                            <Waves size={20} />
                            <span className={styles.serviceButtonLabel}>Récupération contrastée</span>
                          </button>
                        </div>
                      </div>

                      {/* Date & Time fields */}
                      <div className={styles.dateTimeGrid}>
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Date</label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Heure de début</label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className={styles.formSelect}
                          >
                            {selectedService === 'padel' ? (
                              <>
                                <option value="09:00">09:00 - 10:30 (1h30)</option>
                                <option value="10:30">10:30 - 12:00 (1h30)</option>
                                <option value="14:00">14:00 - 15:30 (1h30)</option>
                                <option value="15:30">15:30 - 17:00 (1h30)</option>
                                <option value="18:00">18:00 - 19:30 (1h30)</option>
                              </>
                            ) : (
                              <>
                                <option value="08:00">08:00 - 09:00 (1h)</option>
                                <option value="09:00">09:00 - 10:00 (1h)</option>
                                <option value="10:00">10:00 - 11:00 (1h)</option>
                                <option value="14:00">14:00 - 15:00 (1h)</option>
                                <option value="15:00">15:00 - 16:00 (1h)</option>
                                <option value="16:00">16:00 - 17:00 (1h)</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>

                      {/* Custom Padel details */}
                      {selectedService === 'padel' && (
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Nombre de joueurs</label>
                          <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                              <input
                                type="radio"
                                name="players"
                                value="2"
                                checked={padelPlayers === '2'}
                                onChange={() => setPadelPlayers('2')}
                                className={styles.radioInput}
                              />
                              2 Joueurs (Simple)
                            </label>
                            <label className={styles.radioLabel}>
                              <input
                                type="radio"
                                name="players"
                                value="4"
                                checked={padelPlayers === '4'}
                                onChange={() => setPadelPlayers('4')}
                                className={styles.radioInput}
                              />
                              4 Joueurs (Double)
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Custom Coaching details */}
                      {selectedService === 'coaching' && (
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Type de Coaching</label>
                          <select
                            value={coachingType}
                            onChange={(e) => setCoachingType(e.target.value)}
                            className={styles.formSelect}
                          >
                            <option value="Préparation physique">Préparation physique</option>
                            <option value="Coaching personnalisé">Coaching personnalisé</option>
                            <option value="Réathlétisation">Réathlétisation</option>
                          </select>
                        </div>
                      )}

                      {/* Notes / Comments */}
                      <div className={styles.formGridGroup}>
                        <label className={styles.formLabel}>Notes ou demandes particulières (facultatif)</label>
                        <textarea
                          rows="3"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Besoin de louer des raquettes, antécédents médicaux..."
                          className={styles.formTextarea}
                        />
                      </div>

                      <button type="submit" className={styles.btnPrimary} style={{ padding: '14px 0' }}>
                        Confirmer la réservation
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Member Login Callout */}
                  <div className={`${styles.glassCard} ${styles.loginCallout}`}>
                    <AlertCircle className={styles.loginCalloutIcon} size={32} />
                    <h3 className={styles.subCardTitle}>Réservations en ligne</h3>
                    <p className={styles.calloutText}>
                      Si vous êtes membre ou si vous souhaitez réserver un terrain de padel directement, veuillez vous connecter.
                    </p>
                    <div style={{ paddingTop: '8px' }}>
                      <Link href="/client/login" className={styles.btnPrimaryInline} style={{ padding: '10px 24px' }}>
                        Se connecter
                      </Link>
                    </div>
                  </div>

                  {/* Public Contact Form */}
                  <div className={styles.glassCard}>
                    <h3 className={styles.subCardTitle} style={{ marginBottom: '24px' }}>Formulaire de contact / Réservation manuelle</h3>

                    {contactSuccess ? (
                      <div className={styles.contactSuccessAlert}>
                        Votre message a bien été envoyé ! Notre équipe vous recontactera très rapidement.
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Nom complet</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Jean Dupont"
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Adresse email</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="jean.dupont@email.com"
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGridGroup}>
                          <label className={styles.formLabel}>Message ou question</label>
                          <textarea
                            required
                            rows="4"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Je souhaite réserver une séance d'essai / louer le terrain de padel..."
                            className={styles.formTextarea}
                          />
                        </div>
                        <button type="submit" className={styles.btnPrimary} style={{ padding: '10px 0' }}>
                          Envoyer le message
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Information Column (Right) */}
            <div className={styles.infoColumn}>
              <div className={styles.glassCardInfo}>
                <h3 className={styles.infoCardTitle}>Coordonnées</h3>
                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <MapPin size={18} className={styles.infoIconMap} />
                    <span>3 bis Rue Clément Ader,<br />37270 Montlouis-sur-Loire</span>
                  </li>
                  <li className={styles.infoItemAlign}>
                    <Phone size={16} className={styles.infoIcon} />
                    <a href="tel:+33789235373" className={styles.infoLink}>+33 7 89 23 53 73</a>
                  </li>
                  <li className={styles.infoItemAlign}>
                    <Mail size={16} className={styles.infoIcon} />
                    <a href="mailto:contact@tep-sport.com" className={styles.infoLink}>contact@tep-sport.com</a>
                  </li>
                </ul>
              </div>

              <div className={styles.glassCardInfo}>
                <h3 className={styles.infoCardTitle}>Informations utiles</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p className={styles.infoParagraph}>
                    <strong>Padel :</strong> Les réservations sont programmées sur des tranches de 1h30. Les raquettes et balles peuvent être louées à l'accueil du centre.
                  </p>
                  <p className={styles.infoParagraph}>
                    <strong>Annulations :</strong> Tout créneau réservé doit être annulé au minimum 24 heures à l'avance sous peine de non-remboursement.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}