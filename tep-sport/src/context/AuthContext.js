'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { adminCredentials, clientCredentials, users } from '@/data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('tep_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setIsAdmin(parsed.isAdmin);
    }
    setLoading(false);
  }, []);

  const loginAdmin = (email, password) => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const adminUser = { id: 0, name: 'Administrateur', email, role: 'admin' };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem('tep_auth', JSON.stringify({ user: adminUser, isAdmin: true }));
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects' };
  };

  const loginClient = (email, password) => {
    const found = users.find(u => u.email === email);
    if (found && password === clientCredentials.password) {
      const clientUser = { ...found, role: 'client' };
      setUser(clientUser);
      setIsAdmin(false);
      localStorage.setItem('tep_auth', JSON.stringify({ user: clientUser, isAdmin: false }));
      return { success: true };
    }
    if (email === clientCredentials.email && password === clientCredentials.password) {
      const clientUser = { ...users[0], role: 'client' };
      setUser(clientUser);
      setIsAdmin(false);
      localStorage.setItem('tep_auth', JSON.stringify({ user: clientUser, isAdmin: false }));
      return { success: true };
    }
    return { success: false, error: 'Email ou mot de passe incorrect' };
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('tep_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginAdmin, loginClient, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
