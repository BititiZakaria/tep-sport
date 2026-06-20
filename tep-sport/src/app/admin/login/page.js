'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Key, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { loginAdmin, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user && user.role === 'admin') {
    router.push('/admin/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = loginAdmin(email, password);
    if (res.success) {
      router.push('/admin/dashboard');
    } else {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full space-y-8 glass-card p-8 sm:p-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />

        <div className="text-center space-y-2">
          <Shield className="text-cyan-400 mx-auto" size={32} />
          <h2 className="text-3xl font-black text-white">Administration</h2>
          <p className="text-sm text-white/50">
            Portail de gestion TEP Sport
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2 animate-fade-in-up">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="form-label">Email administrateur</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tep-sport.com"
                  className="form-input pl-10"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              </div>
            </div>

            <div>
              <label className="form-label">Mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input pl-10"
                />
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 border-none"
          >
            Se connecter
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 space-y-3 text-center text-xs">
          <div className="p-3 bg-white/5 rounded-lg text-left text-white/60 space-y-1 leading-relaxed">
            <p className="font-bold text-white/80">Identifiants Administrateur :</p>
            <p>• Email : <code className="text-cyan-400 bg-black/40 px-1 py-0.5 rounded">admin@tep-sport.com</code></p>
            <p>• Mot de passe : <code className="text-cyan-400 bg-black/40 px-1 py-0.5 rounded">admin123</code></p>
          </div>

          <p className="text-white/40">
            Retourner à l'espace membre client ?{' '}
            <Link href="/client/login" className="text-cyan-400 hover:underline">
              Se connecter ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
