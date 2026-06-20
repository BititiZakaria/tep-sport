'use client';
import { useEffect, useState } from 'react';
import { ExternalLink, Globe, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SocialButtons() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdminPage = pathname.startsWith('/admin');
  if (isAdminPage) return null;

  // Instagram gradient requires a defs linearGradient block in the layout, we can put it directly here
  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      {/* SVG Defs for gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="insta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#833AB4" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#FCAF45" />
          </linearGradient>
        </defs>
      </svg>

      {/* Social Links */}
      <div className="flex flex-col gap-3">
        {/* Facebook */}
        <a 
          href="https://www.facebook.com/tepsport.off/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/80 border border-white/10 hover:border-[#1877F2]/50 hover:scale-110 shadow-lg transition-all duration-300"
          aria-label="Facebook"
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#1877F2]/30 scale-105 transition-all duration-300" />
          <ExternalLink size={18} className="text-white group-hover:text-[#1877F2] transition-colors" />
        </a>

        {/* Instagram */}
        <a 
          href="https://www.instagram.com/tep_sport/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/80 border border-white/10 hover:border-pink-500/50 hover:scale-110 shadow-lg transition-all duration-300"
          aria-label="Instagram"
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-pink-500/30 scale-105 transition-all duration-300" />
          <Globe size={18} className="text-white group-hover:text-[url(#insta-grad)] transition-colors" style={{ stroke: 'currentColor' }} />
        </a>

        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/company/tep-sport/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/80 border border-white/10 hover:border-[#0077B5]/50 hover:scale-110 shadow-lg transition-all duration-300"
          aria-label="LinkedIn"
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#0077B5]/30 scale-105 transition-all duration-300" />
          <Users size={18} className="text-white group-hover:text-[#0077B5] transition-colors" />
        </a>
      </div>

      {/* Reading/Scroll progress circle */}
      <div className="relative w-12 h-12 flex items-center justify-center bg-black/80 border border-white/10 rounded-full shadow-lg">
        <svg className="transform -rotate-90 w-12 h-12" viewBox="0 0 48 48">
          <circle 
            cx="24" 
            cy="24" 
            r="20" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            className="text-white/10" 
          />
          <circle 
            cx="24" 
            cy="24" 
            r="20" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray={125.66} 
            strokeDashoffset={125.66 - (125.66 * scrollProgress) / 100}
            className="text-cyan-500 transition-all duration-75 ease-out" 
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-white/90">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
