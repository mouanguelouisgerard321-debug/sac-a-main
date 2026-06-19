import { Match } from '@/data/matches';

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="bg-white rounded-xl border border-[#0B1F3A]/10 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="bg-[#0B1F3A] px-5 py-2">
        <span className="text-[11px] tracking-widest uppercase text-orange-400 font-medium">{match.round}</span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-3xl">{match.flagA}</span>
            <span className="text-sm font-semibold text-[#0B1F3A] text-center">{match.teamA}</span>
          </div>
          <span className="text-[#0B1F3A]/40 font-bold text-sm px-2">VS</span>
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-3xl">{match.flagB}</span>
            <span className="text-sm font-semibold text-[#0B1F3A] text-center">{match.teamB}</span>
          </div>
        </div>

        <div className="space-y-2 mb-5 text-sm text-[#0B1F3A]/70">
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>{match.date} • {match.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="9" r="3"/></svg>
            <span>{match.stadium}, {match.city}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#0B1F3A]/10">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-[#0B1F3A]/50">À partir de</p>
            <p className="text-xl font-bold text-orange-500">{match.priceFrom}$</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Voir les billets
          </button>
        </div>
      </div>
    </div>
  );
}
