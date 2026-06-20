'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Mail, Search, Send, Clock, X, Eye } from 'lucide-react';

export default function AdminMailing() {
  const { emails, sendEmail } = useData();

  // Composer fields
  const [subject, setSubject] = useState('');
  const [recipients, setRecipients] = useState('Tous les membres');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  // Viewer state
  const [selectedMail, setSelectedMail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail({
      subject,
      recipients,
      content
    });

    setSuccess(true);
    setSubject('');
    setContent('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Mail className="text-cyan-400" /> Service Mailing
        </h1>
        <p className="text-sm text-white/50">Envoyez des communications ciblées aux membres du centre.</p>
      </div>

      {/* Grid: Composer vs History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Composer Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
          
          <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Rédiger un message</h3>

          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg">
              ✓ Email envoyé avec succès à la cohorte !
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="form-label">Sujet du message</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="ex: Offre été, fermeture exceptionnelle, etc."
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Groupe de destinataires</label>
              <select
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="form-select"
              >
                <option value="Tous les membres">Tous les membres</option>
                <option value="Abonnés Premium">Abonnés Premium</option>
                <option value="Abonnés Standard">Abonnés Standard</option>
                <option value="Abonnés Accès Libre">Abonnés Accès Libre</option>
              </select>
            </div>

            <div>
              <label className="form-label">Corps du message (Email)</label>
              <textarea
                required
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Rédigez votre email ici..."
                className="form-input resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              <Send size={16} /> Envoyer l'email
            </button>
          </form>
        </div>

        {/* Mailing History */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
            <Clock size={18} className="text-cyan-400" /> Historique d'envoi
          </h3>

          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
            {emails.length > 0 ? (
              emails.map((mail) => (
                <div key={mail.id} className="p-4 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between gap-3 group/item">
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{mail.subject}</h4>
                    <p className="text-xs text-white/50">{mail.recipients} • {mail.sentDate}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMail(mail)}
                    className="p-1.5 bg-white/5 border border-white/10 text-white/70 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-md transition-all"
                    title="Voir le contenu"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-white/40 py-8">Aucun email dans l'historique.</p>
            )}
          </div>
        </div>

      </div>

      {/* View Email Content Modal */}
      {selectedMail && (
        <div className="modal-overlay">
          <div className="modal-content relative">
            <button 
              onClick={() => setSelectedMail(null)}
              className="absolute right-4 top-4 p-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white/60"
            >
              <X size={16} />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-black">Destinataires: {selectedMail.recipients}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedMail.subject}</h3>
                <span className="text-xs text-white/40 block mt-1">Envoyé le {selectedMail.sentDate}</span>
              </div>
              <div className="w-full h-px bg-white/5" />
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap bg-white/2 p-4 rounded-xl border border-white/5">
                {selectedMail.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
