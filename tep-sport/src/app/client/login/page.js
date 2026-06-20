'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Key, Mail, AlertCircle } from 'lucide-react';
import styles from './ClientLogin.module.css';

export default function ClientLogin() {
  const { loginClient, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    if (user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/client/dashboard');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = loginClient(email, password);
    if (res.success) {
      router.push('/client/dashboard');
    } else {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        {/* Glow effect */}
        <div className={styles.glow} />

        {/* Header Branding */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Espace membre</span>
          <h2 className={styles.title}>Connexion</h2>
          <p className={styles.subtitle}>
            Accédez à vos réservations et vos séances de coaching
          </p>
        </div>

        {/* Alert Error Box */}
        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldsWrapper}>
            {/* Email Field */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Adresse email</label>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.dupont@email.com"
                  className={styles.input}
                />
                <Mail className={styles.inputIcon} size={16} />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Mot de passe</label>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={styles.input}
                />
                <Key className={styles.inputIcon} size={16} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            <LogIn size={18} />
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Helper Footer Area */}
        <div className={styles.footer}>
          <div className={styles.demoBox}>
            <p className={styles.demoTitle}>Identifiants de démonstration :</p>
            <p>• Email : <code className={styles.codeBadge}>ahmed@email.com</code></p>
            <p>• Mot de passe : <code className={styles.codeBadge}>client123</code></p>
          </div>

          <p className={styles.redirectText}>
            Vous êtes administrateur ?{' '}
            <Link href="/admin/login" className={styles.link}>
              Se connecter ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}