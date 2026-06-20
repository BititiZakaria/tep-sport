'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Search, Plus, Edit2, Trash2, X, Users, Check } from 'lucide-react';

export default function AdminUsers() {
  const { users, addUser, updateUser, deleteUser } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSub, setFilterSub] = useState('all');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Add User fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSub, setNewSub] = useState('Standard');

  // Edit User fields
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editSub, setEditSub] = useState('Standard');
  const [editStatus, setEditStatus] = useState('active');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = filterSub === 'all' ? true : u.subscription === filterSub;
    return matchesSearch && matchesSub;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addUser({
      name: newName,
      email: newEmail,
      phone: newPhone,
      subscription: newSub
    });
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditSub(user.subscription);
    setEditStatus(user.status);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUser(editingUser.id, {
      name: editName,
      email: editEmail,
      phone: editPhone,
      subscription: editSub,
      status: editStatus
    });
    setShowEditModal(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Users className="text-cyan-400" /> Gestion Membres
          </h1>
          <p className="text-sm text-white/50">Gérez le statut, les fiches et les abonnements des utilisateurs.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-1.5 py-2.5 px-5 text-sm"
        >
          <Plus size={16} /> Ajouter un membre
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
            value={filterSub}
            onChange={(e) => setFilterSub(e.target.value)}
            className="form-select"
          >
            <option value="all">Tous les abonnements</option>
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
            <option value="Accès Libre">Accès Libre</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Nom / Contact</th>
                <th>Abonnement</th>
                <th>Date d'inscription</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center font-bold text-cyan-400">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-xs text-white/45">{u.email} • {u.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-white/80 font-medium">{u.subscription}</span>
                    </td>
                    <td>
                      <span className="text-white/70">{u.joinDate}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${u.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                        {u.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEditClick(u)}
                          className="p-1.5 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white rounded-md transition-all"
                          title="Modifier la fiche"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Voulez-vous vraiment supprimer la fiche de ${u.name} ?`)) {
                              deleteUser(u.id);
                            }
                          }}
                          className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-md transition-all"
                          title="Supprimer la fiche"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-white/40">
                    Aucun utilisateur trouvé.
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

            <h3 className="text-xl font-bold text-white mb-6">Ajouter un membre</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="form-label">Nom complet</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ahmed Benali"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Adresse email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ahmed@email.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Numéro de téléphone</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Formule Abonnement</label>
                <select
                  value={newSub}
                  onChange={(e) => setNewSub(e.target.value)}
                  className="form-select"
                >
                  <option value="Accès Libre">Accès Libre</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Confirmer l'ajout
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content relative">
            <button 
              onClick={() => { setShowEditModal(false); setEditingUser(null); }}
              className="absolute right-4 top-4 p-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white/60"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">Modifier la fiche membre</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="form-label">Nom complet</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Adresse email</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Numéro de téléphone</label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Abonnement</label>
                  <select
                    value={editSub}
                    onChange={(e) => setEditSub(e.target.value)}
                    className="form-select"
                  >
                    <option value="Accès Libre">Accès Libre</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Statut</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
