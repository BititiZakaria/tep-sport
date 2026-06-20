'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import { Calendar, Clock, Trophy, Dumbbell, Waves, Users, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

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
    // Reset form
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
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Header */}
      <section className="py-12 px-6 text-center space-y-4">
        <span className="text-cyan-400 uppercase tracking-widest font-bold text-sm">Réservation</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Réservez votre <span className="gradient-text-animated">Séance</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Padel, préparation physique, coaching personnalisé ou récupération. Choisissez votre formule et réservez votre créneau en ligne.
        </p>
      </section>

      {/* Main Reservation Section */}
      <section className="py-8 px-6 bg-black/30 flex-1">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Booking Form or Login Prompt */}
            <div className="lg:col-span-8">
              {user ? (
                <div className="glass-card p-6 sm:p-10 space-y-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Calendar className="text-cyan-400" /> Formulaire de Réservation
                  </h2>
                  
                  {bookingSuccess ? (
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-4 text-center animate-fade-in-up">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle2 size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Réservation validée !</h3>
                      <p className="text-sm text-white/70">
                        Votre réservation a bien été enregistrée. Retrouvez-la dans votre espace client.
                      </p>
                      <div className="pt-2 flex justify-center gap-4">
                        <Link href="/client/reservations" className="btn-primary py-2 px-5 text-sm">
                          Mes Réservations
                        </Link>
                        <button 
                          onClick={() => setBookingSuccess(false)}
                          className="btn-outline py-2 px-5 text-sm"
                        >
                          Nouvelle réservation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      
                      {/* Service selector */}
                      <div className="space-y-3">
                        <label className="form-label font-bold text-white/80">1. Choisissez le service</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => { setSelectedService('padel'); setBookingTime('09:00'); }}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                              selectedService === 'padel'
                                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            <Trophy size={20} />
                            <span className="font-bold text-sm">Terrain de Padel</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSelectedService('coaching'); setBookingTime('08:00'); }}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                              selectedService === 'coaching'
                                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            <Dumbbell size={20} />
                            <span className="font-bold text-sm">Coaching & Force</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSelectedService('recuperation'); setBookingTime('10:00'); }}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                              selectedService === 'recuperation'
                                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            <Waves size={20} />
                            <span className="font-bold text-sm">Récupération contrastée</span>
                          </button>
                        </div>
                      </div>

                      {/* Date & Time fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label">Heure de début</label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="form-select"
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
                        <div>
                          <label className="form-label">Nombre de joueurs</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                              <input 
                                type="radio" 
                                name="players" 
                                value="2" 
                                checked={padelPlayers === '2'}
                                onChange={() => setPadelPlayers('2')}
                                className="accent-cyan-500" 
                              />
                              2 Joueurs (Simple)
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                              <input 
                                type="radio" 
                                name="players" 
                                value="4" 
                                checked={padelPlayers === '4'}
                                onChange={() => setPadelPlayers('4')}
                                className="accent-cyan-500" 
                              />
                              4 Joueurs (Double)
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Custom Coaching details */}
                      {selectedService === 'coaching' && (
                        <div>
                          <label className="form-label">Type de Coaching</label>
                          <select
                            value={coachingType}
                            onChange={(e) => setCoachingType(e.target.value)}
                            className="form-select"
                          >
                            <option value="Préparation physique">Préparation physique</option>
                            <option value="Coaching personnalisé">Coaching personnalisé</option>
                            <option value="Réathlétisation">Réathlétisation</option>
                          </select>
                        </div>
                      )}

                      {/* Notes / Comments */}
                      <div>
                        <label className="form-label">Notes ou demandes particulières (facultatif)</label>
                        <textarea
                          rows="3"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Besoin de louer des raquettes, antécédents médicaux..."
                          className="form-input resize-none"
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full py-3">
                        Confirmer la réservation
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Member Login Callout */}
                  <div className="glass-card p-6 sm:p-10 text-center space-y-4 border border-cyan-500/20">
                    <AlertCircle className="text-cyan-400 mx-auto" size={32} />
                    <h3 className="text-xl font-bold text-white">Réservations en ligne</h3>
                    <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                      Si vous êtes membre ou si vous souhaitez réserver un terrain de padel directement, veuillez vous connecter.
                    </p>
                    <div className="pt-2">
                      <Link href="/client/login" className="btn-primary text-sm px-6 py-2.5">
                        Se connecter
                      </Link>
                    </div>
                  </div>

                  {/* Public Contact Form */}
                  <div className="glass-card p-6 sm:p-10 space-y-6">
                    <h3 className="text-xl font-bold text-white">Formulaire de contact / Réservation manuelle</h3>
                    
                    {contactSuccess ? (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400">
                        Votre message a bien été envoyé ! Notre équipe vous recontactera très rapidement.
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label className="form-label">Nom complet</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Jean Dupont"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label">Adresse email</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="jean.dupont@email.com"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label">Message ou question</label>
                          <textarea
                            required
                            rows="4"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Je souhaite réserver une séance d'essai / louer le terrain de padel..."
                            className="form-input resize-none"
                          />
                        </div>
                        <button type="submit" className="btn-primary w-full py-2.5 text-sm">
                          Envoyer le message
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Information Column (Right) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Coordonnées</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-white/70">
                    <MapPin size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>3 bis Rue Clément Ader,<br />37270 Montlouis-sur-Loire</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white/70">
                    <Phone size={16} className="text-cyan-400 shrink-0" />
                    <a href="tel:+33789235373" className="hover:text-cyan-400 transition-colors">+33 7 89 23 53 73</a>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white/70">
                    <Mail size={16} className="text-cyan-400 shrink-0" />
                    <a href="mailto:contact@tep-sport.com" className="hover:text-cyan-400 transition-colors">contact@tep-sport.com</a>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Informations utiles</h3>
                <div className="space-y-3 text-xs text-white/60 leading-relaxed">
                  <p>
                    <strong className="text-white/80">Padel :</strong> Les réservations sont programmées sur des tranches de 1h30. Les raquettes et balles peuvent être louées à l'accueil du centre.
                  </p>
                  <p>
                    <strong className="text-white/80">Annulations :</strong> Tout créneau réservé doit être annulé au minimum 24 heures à l'avance sous peine de non-remboursement.
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
