'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Calendar as CalendarIcon, Trophy, Dumbbell, ChevronLeft, ChevronRight, X, Clock, User } from 'lucide-react';

export default function AdminCalendrier() {
  const { reservations, seances } = useData();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 20)); // June 2026 for mock data matching
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDayString, setSelectedDayString] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get calendar details
  const firstDayIndex = new Date(year, month, 1).getDay(); // Day of week (0-6)
  const totalDays = new Date(year, month + 1, 0).getDate(); // Number of days in month

  // Shift index to start week on Monday
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 15));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 15));
  };

  // Get padel and coaching events for a specific day string (yyyy-mm-dd)
  const getEventsForDay = (dayNum) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    
    const padelForDay = reservations
      .filter(r => r.date === formattedDate && r.status !== 'cancelled')
      .map(r => ({ ...r, eventType: 'padel' }));

    const coachingForDay = seances
      .filter(s => s.date === formattedDate && s.status !== 'cancelled')
      .map(s => ({ ...s, eventType: 'coaching' }));

    return [...padelForDay, ...coachingForDay];
  };

  const handleDayClick = (dayNum) => {
    const dayEvents = getEventsForDay(dayNum);
    setSelectedDayEvents(dayEvents);
    setSelectedDayString(`${dayNum} ${monthNames[month]} ${year}`);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <CalendarIcon className="text-cyan-400" /> Calendrier Global
        </h1>
        <p className="text-sm text-white/50">Vue d'ensemble de tous les créneaux occupés (Padel & Coaching).</p>
      </div>

      {/* Calendar Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* The Month Grid */}
        <div className="lg:col-span-8 glass-card p-6 space-y-6">
          
          {/* Calendar Header Nav */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              {monthNames[month]} {year}
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={prevMonth}
                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white/80 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white/80 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-white/40 uppercase tracking-widest gap-2">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank offset days */}
            {[...Array(adjustedFirstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square bg-transparent border border-transparent rounded-lg opacity-20" />
            ))}

            {/* Actual Month Days */}
            {[...Array(totalDays)].map((_, idx) => {
              const dayNum = idx + 1;
              const dayEvents = getEventsForDay(dayNum);
              const isToday = dayNum === 20 && month === 5 && year === 2026; // Highlight current mock date

              return (
                <button
                  key={`day-${dayNum}`}
                  onClick={() => handleDayClick(dayNum)}
                  className={`aspect-square p-2 border rounded-xl flex flex-col justify-between items-start transition-all ${
                    isToday 
                      ? 'border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20' 
                      : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  <span className={`text-xs font-bold ${isToday ? 'text-cyan-400' : 'text-white/60'}`}>
                    {dayNum}
                  </span>

                  {/* Event indicators */}
                  <div className="flex flex-wrap gap-1.5 mt-auto w-full">
                    {dayEvents.slice(0, 3).map((evt, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${
                          evt.eventType === 'padel' ? 'bg-cyan-400' : 'bg-emerald-400'
                        }`} 
                        title={`${evt.eventType === 'padel' ? 'Padel' : 'Coaching'}: ${evt.startTime}`}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] font-black text-cyan-400/80 leading-none">
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected Day Details Panel */}
        <div className="lg:col-span-4 glass-card p-6 space-y-6 min-h-[350px]">
          <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">
            Créneaux du {selectedDayString || "Sélectionnez un jour"}
          </h3>

          <div className="space-y-4">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((evt, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 bg-white/5 border rounded-xl space-y-3 ${
                    evt.eventType === 'padel' ? 'border-cyan-500/20' : 'border-emerald-500/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      evt.eventType === 'padel' 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                    }`}>
                      {evt.eventType === 'padel' ? 'Padel' : 'Coaching'}
                    </span>
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <Clock size={12} /> {evt.startTime} - {evt.endTime}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <User size={14} className="text-cyan-400" /> {evt.eventType === 'padel' ? evt.userName : evt.clientName}
                    </h4>
                    {evt.eventType === 'padel' ? (
                      <p className="text-xs text-white/50">Terrain : {evt.court} • {evt.players} joueurs</p>
                    ) : (
                      <p className="text-xs text-white/50">Séance : {evt.type} • Coach : {evt.coach}</p>
                    )}
                    {evt.notes && <p className="text-xs text-white/40 italic">Note : {evt.notes}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-white/40 py-12">
                Aucun créneau occupé ou planifié sur ce jour.
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
