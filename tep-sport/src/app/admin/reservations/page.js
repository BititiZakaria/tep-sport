'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Calendar, Trophy, Trash2, Check, X, Search, Plus } from 'lucide-react';

export default function AdminReservations() {
  const { reservations, users, addReservation, updateReservation, cancelReservation } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New reservation states
  const [newUserId, setNewUserId] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:30');
  const [newCourt, setNewCourt] = useState('Terrain 1');
  const [newPlayers, setNewPlayers] = useState('4');
  const [newNotes, setNewNotes] = useState('');

  // Filtering logic
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.userName.toLowerCase().includes(searchTerm.toLowerCase()) || res.court.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : res.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const selectedUser = users.find(u => u.id === parseInt(newUserId));
    if (!selectedUser) return;

    addReservation({
      userId: selectedUser.id,
      userName: selectedUser.name,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      court: newCourt,
      players: parseInt(newPlayers),
      notes: newNotes,
      status: 'confirmed'
    });

    setShowAddModal(false);
    // Reset form
    setNewUserId('');
    setNewDate('');
    setNewNotes('');
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="text-cyan-400" /> Réservations Padel
          </h1>
          <p className="text-sm text-white/50">Gérez le planning et le statut des locations de terrains.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-1.5 py-2.5 px-5 text-sm"
        >
          <Plus size={16} /> Créer une réservation
        </button>
      </div>

      {/* Filters bar */}
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="confirmed">Confirmé</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Date / Heure</th>
                <th>Terrain</th>
                <th>Joueurs</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id}>
                    <td>
                      <div className="font-bold text-white">{res.userName}</div>
                    </td>
                    <td>
                      <div className="text-white/80">{res.date}</div>
                      <div className="text-xs text-white/40">{res.startTime} - {res.endTime}</div>
                    </td>
                    <td>
                      <span className="text-white/70">{res.court}</span>
                    </td>
                    <td>
                      <span className="text-white/70">{res.players} joueurs</span>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        res.status === 'confirmed' ? 'status-confirmed' : (
                          res.status === 'pending' ? 'status-pending' : 'status-cancelled'
                        )
                      }`}>
                        {res.status === 'confirmed' ? 'Confirmé' : (res.status === 'pending' ? 'En attente' : 'Annulé')}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex gap-2 justify-end">
                        {res.status === 'pending' && (
                          <button
                            onClick={() => updateReservation(res.id, { status: 'confirmed' })}
                            className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-all"
                            title="Confirmer la réservation"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelReservation(res.id)}
                            className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-md transition-all"
                            title="Annuler la réservation"
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
                    Aucune réservation trouvée.
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

            <h3 className="text-xl font-bold text-white mb-6">Créer une réservation</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="form-label">Sélectionner un membre</label>
                <select
                  required
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
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
                  <label className="form-label">Terrain</label>
                  <select
                    value={newCourt}
                    onChange={(e) => setNewCourt(e.target.value)}
                    className="form-select"
                  >
                    <option value="Terrain 1">Terrain 1</option>
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
                    <option value="09:00">09:00</option>
                    <option value="10:30">10:30</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:30">15:30</option>
                    <option value="17:00">17:00</option>
                    <option value="18:30">18:30</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Heure de fin</label>
                  <select
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="form-select"
                  >
                    <option value="10:30">10:30</option>
                    <option value="12:00">12:00</option>
                    <option value="13:30">13:30</option>
                    <option value="15:30">15:30</option>
                    <option value="17:00">17:00</option>
                    <option value="18:30">18:30</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Formule de jeu</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input 
                      type="radio" 
                      name="players" 
                      value="2" 
                      checked={newPlayers === '2'}
                      onChange={() => setNewPlayers('2')}
                      className="accent-cyan-500" 
                    />
                    2 Joueurs (Simple)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input 
                      type="radio" 
                      name="players" 
                      value="4" 
                      checked={newPlayers === '4'}
                      onChange={() => setNewPlayers('4')}
                      className="accent-cyan-500" 
                    />
                    4 Joueurs (Double)
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Notes de réservation</label>
                <textarea
                  rows="2"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Besoin de raquettes, etc."
                  className="form-input resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Confirmer la réservation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
