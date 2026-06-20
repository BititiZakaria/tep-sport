'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  users as initialUsers,
  reservationsPadel as initialReservations,
  seancesCoaching as initialSeances,
  emailsSent as initialEmails,
  testimonials,
  services,
  abonnements,
  events,
  boutiqueProducts,
  coursCollectifs
} from '@/data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [seances, setSeances] = useState([]);
  const [emails, setEmails] = useState([]);

  // Load from local storage or mock data
  useEffect(() => {
    const storedUsers = localStorage.getItem('tep_users');
    const storedReservations = localStorage.getItem('tep_reservations');
    const storedSeances = localStorage.getItem('tep_seances');
    const storedEmails = localStorage.getItem('tep_emails');

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    else {
      setUsers(initialUsers);
      localStorage.setItem('tep_users', JSON.stringify(initialUsers));
    }

    if (storedReservations) setReservations(JSON.parse(storedReservations));
    else {
      setReservations(initialReservations);
      localStorage.setItem('tep_reservations', JSON.stringify(initialReservations));
    }

    if (storedSeances) setSeances(JSON.parse(storedSeances));
    else {
      setSeances(initialSeances);
      localStorage.setItem('tep_seances', JSON.stringify(initialSeances));
    }

    if (storedEmails) setEmails(JSON.parse(storedEmails));
    else {
      setEmails(initialEmails);
      localStorage.setItem('tep_emails', JSON.stringify(initialEmails));
    }
  }, []);

  // Helper helper to save data
  const saveData = (key, data, setter) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  // User CRUD
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    const updated = [...users, newUser];
    saveData('tep_users', updated, setUsers);
    return newUser;
  };

  const updateUser = (id, updatedFields) => {
    const updated = users.map(u => u.id === id ? { ...u, ...updatedFields } : u);
    saveData('tep_users', updated, setUsers);
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    saveData('tep_users', updated, setUsers);
  };

  // Reservation CRUD
  const addReservation = (res) => {
    const newRes = {
      ...res,
      id: reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1,
      status: res.status || 'confirmed'
    };
    const updated = [...reservations, newRes];
    saveData('tep_reservations', updated, setReservations);
    return newRes;
  };

  const updateReservation = (id, updatedFields) => {
    const updated = reservations.map(r => r.id === id ? { ...r, ...updatedFields } : r);
    saveData('tep_reservations', updated, setReservations);
  };

  const cancelReservation = (id) => {
    updateReservation(id, { status: 'cancelled' });
  };

  // Seance CRUD
  const addSeance = (seance) => {
    const newSeance = {
      ...seance,
      id: seances.length > 0 ? Math.max(...seances.map(s => s.id)) + 1 : 1,
      status: seance.status || 'confirmed'
    };
    const updated = [...seances, newSeance];
    saveData('tep_seances', updated, setSeances);
    return newSeance;
  };

  const updateSeance = (id, updatedFields) => {
    const updated = seances.map(s => s.id === id ? { ...s, ...updatedFields } : s);
    saveData('tep_seances', updated, setSeances);
  };

  const cancelSeance = (id) => {
    updateSeance(id, { status: 'cancelled' });
  };

  // Mailing CRUD
  const sendEmail = (email) => {
    const newEmail = {
      ...email,
      id: emails.length > 0 ? Math.max(...emails.map(e => e.id)) + 1 : 1,
      sentDate: new Date().toISOString().split('T')[0],
      status: 'sent'
    };
    const updated = [newEmail, ...emails];
    saveData('tep_emails', updated, setEmails);
    return newEmail;
  };

  return (
    <DataContext.Provider value={{
      users,
      reservations,
      seances,
      emails,
      testimonials,
      services,
      abonnements,
      events,
      boutiqueProducts,
      coursCollectifs,
      addUser,
      updateUser,
      deleteUser,
      addReservation,
      updateReservation,
      cancelReservation,
      addSeance,
      updateSeance,
      cancelSeance,
      sendEmail
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
