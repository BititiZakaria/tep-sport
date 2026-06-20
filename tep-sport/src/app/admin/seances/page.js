'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Dumbbell, Search, Plus, Trash2, Check, X } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Dumbbell className="text-cyan-400" /> Séances Coaching
          </h1>
          <p className="text-sm text-white/50">Planifiez et suivez les cours individuels et bilans physiques.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-1.5 py-2.5 px-5 text-sm"
        >
          <Plus size={16} /> Planifier une séance
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un membre..."
            className="form-input pl-10"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="form-select"
          >
            <option value="all">Tous les types de coaching</option>
            <option value="Préparation physique">Préparation physique</option>
            <option value="Coaching personnalisé">Coaching personnalisé</option>
            <option value="Récupération">Récupération</option>
          </select>
        </div>
      </div>

      {/* Seances Table */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Type de séance</th>
                <th>Date / Heure</th>
                <th>Coach</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSeances.length > 0 ? (
                filteredSeances.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="font-bold text-white">{s.clientName}</div>
                    </td>
                    <td>
                      <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {s.type}
                      </span>
                      {s.notes && <p className="text-[10px] text-white/40 italic mt-1">Note: {s.notes}</p>}
                    </td>
                    <td>
                      <div className="text-white/80">{s.date}</div>
                      <div className="text-xs text-white/40">{s.startTime} - {s.endTime}</div>
                    </td>
                    <td>
                      <span className="text-white/70">{s.coach}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        s.status === 'confirmed' ? 'status-confirmed' : (
                          s.status === 'pending' ? 'status-pending' : 'status-cancelled'
                        )
                      }`}>
                        {s.status === 'confirmed' ? 'Confirmé' : (s.status === 'pending' ? 'En attente' : 'Annulé')}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex gap-2 justify-end">
                        {s.status === 'pending' && (
                          <button
                            onClick={() => updateSeance(s.id, { status: 'confirmed' })}
                            className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-all"
                            title="Confirmer la séance"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {s.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelSeance(s.id)}
                            className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-md transition-all"
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
                  <td colSpan="6" className="text-center py-8 text-white/40">
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
        <div className="modal-overlay">
          <div className="modal-content relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white/60"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">Planifier une séance</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="form-label">Sélectionner le membre</label>
                <select
                  required
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="form-select"
                >
                  <option value="">-- Choisir un membre --</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Type de coaching</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Préparation physique">Préparation physique</option>
                    <option value="Coaching personnalisé">Coaching personnalisé</option>
                    <option value="Réathlétisation">Réathlétisation</option>
                    <option value="Récupération">Récupération (Sauna Contrasté)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Heure de début</label>
                  <select
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="form-select"
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
                  <label className="form-label">Heure de fin</label>
                  <select
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="form-select"
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
                <label className="form-label">Notes de la séance</label>
                <textarea
                  rows="3"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Objectif force, retour de blessure croisés, etc."
                  className="form-input resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Planifier la séance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
