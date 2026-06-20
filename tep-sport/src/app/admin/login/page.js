'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Key, Mail, AlertCircle } from 'lucide-react';
import styles from './AdminLogin.module.css'; // Importation du CSS Module

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
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        {/* Glow effect */}
        <div className={styles.glow} />

        {/* Header Branding */}
        <div className={styles.header}>
          <Shield className={styles.icon} size={32} />
          <h2 className={styles.title}>Administration</h2>
          <p className={styles.subtitle}>
            Portail de gestion TEP Sport
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
              <label className={styles.label}>Email administrateur</label>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tep-sport.com"
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
            Se connecter
          </button>
        </form>

        {/* Helper Footer Area */}
        <div className={styles.footer}>
          <div className={styles.credentialsBox}>
            <p className={styles.credentialsTitle}>Identifiants Administrateur :</p>
            <p>• Email : <code className={styles.codeBadge}>admin@tep-sport.com</code></p>
            <p>• Mot de passe : <code className={styles.codeBadge}>admin123</code></p>
          </div>

          <p className={styles.redirectText}>
            Retourner à l'espace membre client ?{' '}
            <Link href="/client/login" className={styles.link}>
              Se connecter ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}