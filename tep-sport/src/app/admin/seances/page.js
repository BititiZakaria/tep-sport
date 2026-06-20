'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Dumbbell, Search, Plus, Check, X } from 'lucide-react';
import styles from './AdminSeances.module.css'; // Liaison exclusive du CSS Module

export default function AdminSeances() {
  const { seances, users, addSeance, updateSeance, cancelSeance } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New seance fields
  const [newClientId, setNewClientId] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStartTime, setNewStartTime] = useState('08:00');
  const [newEndTime, setNewEndTime] = useState('09:00');
  const [newType, setNewType] = useState('Préparation physique');
  const [newNotes, setNewNotes] = useState('');

  const filteredSeances = seances.filter(s => {
    const matchesSearch = s.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' ? true : s.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const selectedClient = users.find(u => u.id === parseInt(newClientId));
    if (!selectedClient) return;

    addSeance({
      coach: 'Yoan',
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      type: newType,
      notes: newNotes,
      status: 'confirmed'
    });

    setShowAddModal(false);
    setNewClientId('');
    setNewDate('');
    setNewNotes('');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>
            <Dumbbell className="text-cyan-400" /> Séances Coaching
          </h1>
          <p className={styles.pageSubtitle}>Planifiez et suivez les cours individuels et bilans physiques.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className={styles.btnPrimaryCustom}
        >
          <Plus size={16} /> Planifier une séance
        </button>
      </div>

      {/* Filters Bar */}
      <div className={styles.filtersGrid}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un membre..."
            className={styles.formInputWithIcon}
          />
          <Search className={styles.searchIcon} size={16} />
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.formSelect}
          >
            <option value="all">Tous les types de coaching</option>
            <option value="Préparation physique">Préparation physique</option>
            <option value="Coaching personnalisé">Coaching personnalisé</option>
            <option value="Récupération">Récupération</option>
          </select>
        </div>
      </div>

      {/* Seances Table */}
      <div className={styles.tableContainer}>
        <div className={styles.responsiveWrapper}>
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Type de séance</th>
                <th>Date / Heure</th>
                <th>Coach</th>
                <th>Statut</th>
                <th className={styles.textRight}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSeances.length > 0 ? (
                filteredSeances.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.memberName}>{s.clientName}</div>
                    </td>
                    <td>
                      <span className={styles.sessionBadge}>
                        {s.type}
                      </span>
                      {s.notes && <p className={styles.sessionNotes}>Note: {s.notes}</p>}
                    </td>
                    <td>
                      <div className={styles.timeMain}>{s.date}</div>
                      <div className={styles.timeSub}>{s.startTime} - {s.endTime}</div>
                    </td>
                    <td>
                      <span className={styles.coachName}>{s.coach}</span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${s.status === 'confirmed' ? styles.statusConfirmed : (
                          s.status === 'pending' ? styles.statusPending : styles.statusCancelled
                        )
                        }`}>
                        {s.status === 'confirmed' ? 'Confirmé' : (s.status === 'pending' ? 'En attente' : 'Annulé')}
                      </span>
                    </td>
                    <td className={styles.textRight}>
                      <div className={styles.actionsFlex}>
                        {s.status === 'pending' && (
                          <button
                            onClick={() => updateSeance(s.id, { status: 'confirmed' })}
                            className={styles.btnConfirm}
                            title="Confirmer la séance"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {s.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelSeance(s.id)}
                            className={styles.btnCancel}
                            title="Annuler la séance"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={`${styles.textRight} text-center py-8 text-white/40`} style={{ textAlign: 'center' }}>
                    Aucune séance trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setShowAddModal(false)}
              className={styles.modalCloseBtn}
            >
              <X size={16} />
            </button>

            <h3 className={styles.modalTitle}>Planifier une séance</h3>

            <form onSubmit={handleAddSubmit} className={styles.formFieldsSpacing}>
              <div>
                <label className={styles.formLabel}>Sélectionner le membre</label>
                <select
                  required
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="">-- Choisir un membre --</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>

              <div className={styles.gridTwoCols}>
                <div>
                  <label className={styles.formLabel}>Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>Type de coaching</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="Préparation physique">Préparation physique</option>
                    <option value="Coaching personnalisé">Coaching personnalisé</option>
                    <option value="Réathlétisation">Réathlétisation</option>
                    <option value="Récupération">Récupération (Sauna Contrasté)</option>
                  </select>
                </div>
              </div>

              <div className={styles.gridTwoCols}>
                <div>
                  <label className={styles.formLabel}>Heure de début</label>
                  <select
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>
                <div>
                  <label className={styles.formLabel}>Heure de fin</label>
                  <select
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={styles.formLabel}>Notes de la séance</label>
                <textarea
                  rows="3"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Objectif force, retour de blessure croisés, etc."
                  className={styles.textareaFixed}
                />
              </div>

              <button type="submit" className={styles.btnFullWidth}>
                Planifier la séance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}