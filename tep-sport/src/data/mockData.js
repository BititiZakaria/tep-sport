// Mock data for TEP Sport application

export const users = [
  { id: 1, name: 'Ahmed Benali', email: 'ahmed@email.com', phone: '06 12 34 56 78', subscription: 'Premium', status: 'active', joinDate: '2025-01-15', avatar: null },
  { id: 2, name: 'Sophie Martin', email: 'sophie@email.com', phone: '06 23 45 67 89', subscription: 'Standard', status: 'active', joinDate: '2025-02-20', avatar: null },
  { id: 3, name: 'Lucas Dupont', email: 'lucas@email.com', phone: '06 34 56 78 90', subscription: 'Premium', status: 'active', joinDate: '2025-03-10', avatar: null },
  { id: 4, name: 'Emma Leroy', email: 'emma@email.com', phone: '06 45 67 89 01', subscription: 'Accès Libre', status: 'active', joinDate: '2025-04-05', avatar: null },
  { id: 5, name: 'Thomas Bernard', email: 'thomas@email.com', phone: '06 56 78 90 12', subscription: 'Premium', status: 'inactive', joinDate: '2024-11-20', avatar: null },
  { id: 6, name: 'Camille Moreau', email: 'camille@email.com', phone: '06 67 89 01 23', subscription: 'Standard', status: 'active', joinDate: '2025-05-01', avatar: null },
  { id: 7, name: 'Nathan Petit', email: 'nathan@email.com', phone: '06 78 90 12 34', subscription: 'Accès Libre', status: 'active', joinDate: '2025-05-15', avatar: null },
  { id: 8, name: 'Léa Roux', email: 'lea@email.com', phone: '06 89 01 23 45', subscription: 'Premium', status: 'active', joinDate: '2025-06-01', avatar: null },
  { id: 9, name: 'Hugo Fournier', email: 'hugo@email.com', phone: '06 90 12 34 56', subscription: 'Standard', status: 'inactive', joinDate: '2024-09-10', avatar: null },
  { id: 10, name: 'Chloé Girard', email: 'chloe@email.com', phone: '06 01 23 45 67', subscription: 'Premium', status: 'active', joinDate: '2025-06-10', avatar: null },
];

export const reservationsPadel = [
  { id: 1, userId: 1, userName: 'Ahmed Benali', date: '2026-06-20', startTime: '09:00', endTime: '10:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 2, userId: 2, userName: 'Sophie Martin', date: '2026-06-20', startTime: '10:30', endTime: '12:00', court: 'Terrain 1', status: 'confirmed', players: 2, notes: 'Débutantes' },
  { id: 3, userId: 3, userName: 'Lucas Dupont', date: '2026-06-20', startTime: '14:00', endTime: '15:30', court: 'Terrain 1', status: 'pending', players: 4, notes: '' },
  { id: 4, userId: 4, userName: 'Emma Leroy', date: '2026-06-21', startTime: '09:00', endTime: '10:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 5, userId: 6, userName: 'Camille Moreau', date: '2026-06-21', startTime: '11:00', endTime: '12:30', court: 'Terrain 1', status: 'confirmed', players: 2, notes: '' },
  { id: 6, userId: 7, userName: 'Nathan Petit', date: '2026-06-21', startTime: '16:00', endTime: '17:30', court: 'Terrain 1', status: 'cancelled', players: 4, notes: 'Annulé pour cause météo' },
  { id: 7, userId: 8, userName: 'Léa Roux', date: '2026-06-22', startTime: '10:00', endTime: '11:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 8, userId: 10, userName: 'Chloé Girard', date: '2026-06-22', startTime: '14:00', endTime: '15:30', court: 'Terrain 1', status: 'pending', players: 2, notes: '' },
  { id: 9, userId: 1, userName: 'Ahmed Benali', date: '2026-06-23', startTime: '09:00', endTime: '10:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 10, userId: 3, userName: 'Lucas Dupont', date: '2026-06-23', startTime: '18:00', endTime: '19:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: 'Match amical' },
  { id: 11, userId: 2, userName: 'Sophie Martin', date: '2026-06-24', startTime: '10:00', endTime: '11:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 12, userId: 6, userName: 'Camille Moreau', date: '2026-06-24', startTime: '15:00', endTime: '16:30', court: 'Terrain 1', status: 'pending', players: 2, notes: '' },
  { id: 13, userId: 8, userName: 'Léa Roux', date: '2026-06-25', startTime: '09:00', endTime: '10:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 14, userId: 4, userName: 'Emma Leroy', date: '2026-06-25', startTime: '11:00', endTime: '12:30', court: 'Terrain 1', status: 'confirmed', players: 4, notes: '' },
  { id: 15, userId: 10, userName: 'Chloé Girard', date: '2026-06-26', startTime: '14:00', endTime: '15:30', court: 'Terrain 1', status: 'confirmed', players: 2, notes: '' },
];

export const seancesCoaching = [
  { id: 1, coach: 'Yoan', clientId: 1, clientName: 'Ahmed Benali', date: '2026-06-20', startTime: '08:00', endTime: '09:00', type: 'Préparation physique', status: 'confirmed', notes: 'Programme force' },
  { id: 2, coach: 'Yoan', clientId: 2, clientName: 'Sophie Martin', date: '2026-06-20', startTime: '10:00', endTime: '11:00', type: 'Coaching personnalisé', status: 'confirmed', notes: 'Objectif perte de poids' },
  { id: 3, coach: 'Yoan', clientId: 3, clientName: 'Lucas Dupont', date: '2026-06-20', startTime: '14:00', endTime: '15:00', type: 'Préparation physique', status: 'confirmed', notes: 'Préparation compétition' },
  { id: 4, coach: 'Yoan', clientId: 6, clientName: 'Camille Moreau', date: '2026-06-21', startTime: '09:00', endTime: '10:00', type: 'Coaching personnalisé', status: 'confirmed', notes: '' },
  { id: 5, coach: 'Yoan', clientId: 8, clientName: 'Léa Roux', date: '2026-06-21', startTime: '11:00', endTime: '12:00', type: 'Récupération', status: 'pending', notes: 'Protocole sauna + bains' },
  { id: 6, coach: 'Yoan', clientId: 10, clientName: 'Chloé Girard', date: '2026-06-21', startTime: '15:00', endTime: '16:00', type: 'Préparation physique', status: 'confirmed', notes: '' },
  { id: 7, coach: 'Yoan', clientId: 4, clientName: 'Emma Leroy', date: '2026-06-22', startTime: '09:00', endTime: '10:00', type: 'Coaching personnalisé', status: 'confirmed', notes: 'Remise en forme' },
  { id: 8, coach: 'Yoan', clientId: 1, clientName: 'Ahmed Benali', date: '2026-06-22', startTime: '14:00', endTime: '15:00', type: 'Préparation physique', status: 'confirmed', notes: 'Suite programme force' },
  { id: 9, coach: 'Yoan', clientId: 7, clientName: 'Nathan Petit', date: '2026-06-23', startTime: '10:00', endTime: '11:00', type: 'Coaching personnalisé', status: 'cancelled', notes: '' },
  { id: 10, coach: 'Yoan', clientId: 3, clientName: 'Lucas Dupont', date: '2026-06-23', startTime: '16:00', endTime: '17:00', type: 'Préparation physique', status: 'confirmed', notes: '' },
  { id: 11, coach: 'Yoan', clientId: 2, clientName: 'Sophie Martin', date: '2026-06-24', startTime: '09:00', endTime: '10:00', type: 'Coaching personnalisé', status: 'confirmed', notes: '' },
  { id: 12, coach: 'Yoan', clientId: 6, clientName: 'Camille Moreau', date: '2026-06-24', startTime: '14:00', endTime: '15:00', type: 'Récupération', status: 'confirmed', notes: '' },
  { id: 13, coach: 'Yoan', clientId: 8, clientName: 'Léa Roux', date: '2026-06-25', startTime: '10:00', endTime: '11:00', type: 'Préparation physique', status: 'confirmed', notes: '' },
  { id: 14, coach: 'Yoan', clientId: 10, clientName: 'Chloé Girard', date: '2026-06-25', startTime: '15:00', endTime: '16:00', type: 'Coaching personnalisé', status: 'pending', notes: '' },
  { id: 15, coach: 'Yoan', clientId: 4, clientName: 'Emma Leroy', date: '2026-06-26', startTime: '09:00', endTime: '10:00', type: 'Coaching personnalisé', status: 'confirmed', notes: '' },
];

export const emailsSent = [
  { id: 1, subject: 'Bienvenue chez TEP Sport !', recipients: 'Tous les membres', sentDate: '2026-06-15', status: 'sent', content: 'Bienvenue dans votre nouveau centre de performance...' },
  { id: 2, subject: 'Nouveau cours collectif : HIIT', recipients: 'Abonnés Premium', sentDate: '2026-06-10', status: 'sent', content: 'Découvrez notre nouveau cours HIIT tous les mercredis...' },
  { id: 3, subject: 'Tournoi de Padel - Inscriptions ouvertes', recipients: 'Tous les membres', sentDate: '2026-06-05', status: 'sent', content: 'Le premier tournoi de padel TEP Sport arrive...' },
  { id: 4, subject: 'Offre été : -20% sur les abonnements', recipients: 'Non-abonnés', sentDate: '2026-06-01', status: 'sent', content: 'Profitez de notre offre spéciale été...' },
  { id: 5, subject: 'Rappel : Fermeture exceptionnelle', recipients: 'Tous les membres', sentDate: '2026-05-28', status: 'sent', content: 'Le centre sera fermé le 14 juillet...' },
];

export const testimonials = [
  { id: 1, name: 'Pierre D.', role: 'Membre depuis 1 an', rating: 5, text: "Le coaching personnalisé a transformé ma condition physique. L'équipe est professionnelle et l'ambiance motivante." },
  { id: 2, name: 'Marie L.', role: 'Compétitrice Padel', rating: 5, text: "Le terrain de padel est top, et les sessions de récupération après l'entraînement sont un vrai plus." },
  { id: 3, name: 'Julien R.', role: 'Sportif amateur', rating: 5, text: "Enfin un centre qui propose une approche structurée. Les résultats sont là et la méthode est claire." },
];

export const services = [
  {
    id: 'preparation-physique',
    title: 'Préparation Physique',
    shortDesc: 'Un coaching structuré pour atteindre vos objectifs sportifs.',
    icon: 'Dumbbell',
    href: '/preparation-physique',
    image: 'https://www.tep-sport.com/images/prep1.jpg',
  },
  {
    id: 'recuperation',
    title: 'Récupération',
    shortDesc: 'Sauna, bains chaud/froid pour une récupération optimale.',
    icon: 'Waves',
    href: '/recuperation',
    image: 'https://www.tep-sport.com/images/recup1.jpg',
  },
  {
    id: 'padel',
    title: 'Padel',
    shortDesc: 'Terrain de padel pour tous niveaux, réservation en ligne.',
    icon: 'Trophy',
    href: '/padel',
    image: 'https://www.tep-sport.com/images/padel1.jpg',
  },
  {
    id: 'cours-collectifs',
    title: 'Cours Collectifs',
    shortDesc: 'Des séances dynamiques en groupe pour se dépasser ensemble.',
    icon: 'Users',
    href: '/cours-collectifs',
    image: 'https://www.tep-sport.com/images/cours1.jpg',
  },
];

export const abonnements = [
  {
    id: 1,
    name: 'Accès Libre',
    price: '39',
    period: '/mois',
    description: 'Accès à la salle en autonomie',
    features: [
      'Accès salle de musculation',
      'Accès zone cardio',
      'Vestiaires & douches',
      'Sans engagement',
    ],
    popular: false,
    color: 'from-gray-500 to-gray-600',
  },
  {
    id: 2,
    name: 'Standard',
    price: '59',
    period: '/mois',
    description: 'Accès complet avec cours collectifs',
    features: [
      'Tout Accès Libre inclus',
      'Cours collectifs illimités',
      'Programme personnalisé',
      'Suivi mensuel',
      'Accès récupération (1x/sem)',
    ],
    popular: false,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    name: 'Premium',
    price: '89',
    period: '/mois',
    description: "L'expérience complète TEP Sport",
    features: [
      'Tout Standard inclus',
      'Coaching personnalisé (2x/sem)',
      'Accès récupération illimité',
      'Bilan trimestriel complet',
      'Padel (2 sessions/mois)',
      'Accès prioritaire événements',
    ],
    popular: true,
    color: 'from-cyan-400 to-blue-600',
  },
];

export const events = [
  {
    id: 1,
    title: 'Tournoi de Padel TEP Sport',
    date: '2026-07-12',
    time: '09:00 - 18:00',
    description: 'Premier tournoi officiel de padel. Ouvert à tous les niveaux avec des lots à gagner.',
    image: 'https://www.tep-sport.com/images/padel1.jpg',
    category: 'Compétition',
    spots: 16,
    spotsLeft: 4,
  },
  {
    id: 2,
    title: 'Stage de Préparation Physique',
    date: '2026-07-19',
    time: '08:00 - 12:00',
    description: "Stage intensif de préparation physique sur une matinée. Travail de force, d'endurance et d'explosivité.",
    image: 'https://www.tep-sport.com/images/prep1.jpg',
    category: 'Stage',
    spots: 12,
    spotsLeft: 7,
  },
  {
    id: 3,
    title: 'Journée Portes Ouvertes',
    date: '2026-08-02',
    time: '10:00 - 17:00',
    description: 'Découvrez le centre TEP Sport. Séances découverte gratuites, démonstrations et rencontres avec les coachs.',
    image: 'https://www.tep-sport.com/images/accueil1.JPG',
    category: 'Événement',
    spots: 50,
    spotsLeft: 30,
  },
];

export const boutiqueProducts = [
  { id: 1, name: 'T-shirt TEP Sport', price: '29.90', image: 'https://www.tep-sport.com/images/accueil2.jpg', category: 'Vêtements', inStock: true },
  { id: 2, name: 'Gourde TEP Sport 750ml', price: '14.90', image: 'https://www.tep-sport.com/images/accueil3.jpg', category: 'Accessoires', inStock: true },
  { id: 3, name: 'Serviette Microfibre TEP', price: '19.90', image: 'https://www.tep-sport.com/images/accueil4.jpeg', category: 'Accessoires', inStock: true },
  { id: 4, name: 'Sweat TEP Sport', price: '49.90', image: 'https://www.tep-sport.com/images/accueil1.JPG', category: 'Vêtements', inStock: false },
  { id: 5, name: 'Sac de sport TEP', price: '39.90', image: 'https://www.tep-sport.com/images/prep1.jpg', category: 'Accessoires', inStock: true },
  { id: 6, name: 'Brassard sport TEP', price: '12.90', image: 'https://www.tep-sport.com/images/accueil2.jpg', category: 'Accessoires', inStock: true },
];

export const coursCollectifs = [
  { id: 1, name: 'HIIT', day: 'Lundi', time: '12:00 - 13:00', coach: 'Yoan', level: 'Tous niveaux', spots: 12, description: 'Entraînement par intervalles à haute intensité.' },
  { id: 2, name: 'Circuit Training', day: 'Mardi', time: '18:00 - 19:00', coach: 'Yoan', level: 'Intermédiaire', spots: 10, description: 'Enchaînement d\'ateliers pour un travail complet.' },
  { id: 3, name: 'Renforcement', day: 'Mercredi', time: '12:00 - 13:00', coach: 'Yoan', level: 'Tous niveaux', spots: 12, description: 'Renforcement musculaire global avec poids du corps et charges.' },
  { id: 4, name: 'Boxe Fitness', day: 'Jeudi', time: '18:00 - 19:00', coach: 'Yoan', level: 'Tous niveaux', spots: 10, description: 'Cardio et technique de boxe adaptée au fitness.' },
  { id: 5, name: 'Full Body', day: 'Vendredi', time: '12:00 - 13:00', coach: 'Yoan', level: 'Tous niveaux', spots: 12, description: 'Séance complète travaillant l\'ensemble du corps.' },
  { id: 6, name: 'HIIT & Core', day: 'Samedi', time: '10:00 - 11:00', coach: 'Yoan', level: 'Intermédiaire', spots: 10, description: 'HIIT focalisé sur le gainage et la sangle abdominale.' },
];

export const adminCredentials = {
  email: 'admin@tep-sport.com',
  password: 'admin123',
};

export const clientCredentials = {
  email: 'ahmed@email.com',
  password: 'client123',
};
