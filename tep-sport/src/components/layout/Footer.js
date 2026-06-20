'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Globe, Users, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return (
    <footer className="relative bg-black/90 border-t border-white/10 pt-16 pb-8 z-10 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600">
              TEP SPORT
            </span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed">
            Centre de préparation physique, coaching personnalisé, récupération et padel. Un accompagnement structuré et accessible, du débutant au compétiteur.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://www.facebook.com/tepsport.off/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-cyan-500 hover:text-white rounded-full transition-all duration-300 text-white/70">
              <ExternalLink size={18} />
            </a>
            <a href="https://www.instagram.com/tep_sport/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-pink-500 hover:text-white rounded-full transition-all duration-300 text-white/70">
              <Globe size={18} />
            </a>
            <a href="https://www.linkedin.com/company/tep-sport/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 text-white/70">
              <Users size={18} />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-cyan-500">
            Nos Prestations
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/preparation-physique" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Préparation Physique
              </Link>
            </li>
            <li>
              <Link href="/recuperation" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Zone Récupération
              </Link>
            </li>
            <li>
              <Link href="/cours-collectifs" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Cours Collectifs
              </Link>
            </li>
            <li>
              <Link href="/padel" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Terrain de Padel
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-cyan-500">
            Liens utiles
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/le-centre" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Le Centre
              </Link>
            </li>
            <li>
              <Link href="/abonnements" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Tarifs & Abonnements
              </Link>
            </li>
            <li>
              <Link href="/evenements" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Événements & Stages
              </Link>
            </li>
            <li>
              <Link href="/boutique" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Boutique
              </Link>
            </li>
            <li>
              <Link href="/reserver" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                Réserver une séance
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-cyan-500">
            Contact & Horaires
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white/60 text-sm">
              <MapPin size={18} className="text-cyan-500 shrink-0 mt-0.5" />
              <span>3 bis Rue Clément Ader,<br />37270 Montlouis-sur-Loire</span>
            </li>
            <li className="flex items-center gap-3 text-white/60 text-sm">
              <Phone size={16} className="text-cyan-500 shrink-0" />
              <a href="tel:+33789235373" className="hover:text-cyan-400 transition-colors">+33 7 89 23 53 73</a>
            </li>
            <li className="flex items-center gap-3 text-white/60 text-sm">
              <Mail size={16} className="text-cyan-500 shrink-0" />
              <a href="mailto:contact@tep-sport.com" className="hover:text-cyan-400 transition-colors">contact@tep-sport.com</a>
            </li>
            <li className="flex items-start gap-3 text-white/60 text-sm border-t border-white/5 pt-3">
              <Clock size={16} className="text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white/80">Lun - Ven : 06:00 - 22:00</p>
                <p className="font-medium text-white/80">Sam : 08:00 - 20:00</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} TEP Sport. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-xs text-white/40">
          <Link href="/mentions-legales" className="hover:text-cyan-400 transition-colors">Mentions légales</Link>
          <Link href="/cgv" className="hover:text-cyan-400 transition-colors">CGV</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-cyan-400 transition-colors">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
