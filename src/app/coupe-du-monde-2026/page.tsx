'use client';

import { useState } from 'react';
import { matches } from '@/data/matches';
import MatchCard from '@/components/MatchCard';

export default function WorldCupTicketsPage() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredMatches = matches.filter((m) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      m.teamA.toLowerCase().includes(q) ||
      m.teamB.toLowerCase().includes(q) ||
      m.city.toLowerCase().includes(q) ||
      m.stadium.toLowerCase().includes(q)
    );
  });

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Tous les matchs', href: '#matchs' },
    { label: 'Garanties', href: '#garanties' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A] antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1F3A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#accueil" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">26</span>
              <span className="text-white font-bold text-lg tracking-wide">WC26 Billets</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium text-white/80 hover:text-orange-400 transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button className="text-sm font-medium text-white/90 hover:text-white px-4 py-2 transition-colors">
                Connexion
              </button>
              <button className="text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-colors">
                Inscription
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <div className="w-5 space-y-1.5">
                <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="block text-sm font-medium text-white/80" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 text-sm font-medium text-white border border-white/30 px-4 py-2 rounded-lg">Connexion</button>
              <button className="flex-1 text-sm font-semibold bg-orange-500 text-white px-4 py-2 rounded-lg">Inscription</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="accueil" className="relative bg-[#0B1F3A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Billets Coupe du Monde <span className="text-orange-500">2026</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Réservez vos places en toute confiance : paiement sécurisé, billets vérifiés et meilleur prix garanti pour vivre la compétition au plus près du terrain.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-xl p-2 flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl mx-auto shadow-xl"
          >
            <div className="flex items-center flex-1 px-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="2" className="opacity-50 shrink-0">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher par équipe, ville ou stade…"
                className="w-full px-3 py-3 text-sm text-[#0B1F3A] placeholder-[#0B1F3A]/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Matches */}
      <section id="matchs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Calendrier</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">Tous les matchs</h2>
        </div>

        {filteredMatches.length === 0 ? (
          <p className="text-center text-[#0B1F3A]/60">Aucun match ne correspond à votre recherche.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {/* Guarantees */}
      <section id="garanties" className="bg-[#F4F6FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="1.5">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                ),
                title: 'Paiement sécurisé',
                desc: 'Toutes les transactions sont chiffrées et protégées de bout en bout.',
              },
              {
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: 'Meilleur prix garanti',
                desc: 'Nous vous remboursons la différence si vous trouvez moins cher ailleurs.',
              },
              {
                icon: (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                ),
                title: 'Billets vérifiés',
                desc: 'Chaque billet est contrôlé et authentifié avant la livraison.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="font-bold text-[#0B1F3A]">{title}</h3>
                <p className="text-sm text-[#0B1F3A]/60 max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">26</span>
                <span className="font-bold">WC26 Billets</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                La billetterie officielle pour vivre la Coupe du Monde 2026 en toute sérénité.
              </p>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase text-orange-400 mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#accueil" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#matchs" className="hover:text-white transition-colors">Tous les matchs</a></li>
                <li><a href="#garanties" className="hover:text-white transition-colors">Garanties</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase text-orange-400 mb-4">Aide</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Remboursements</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conditions générales</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase text-orange-400 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>support@wc26billets.com</li>
                <li>+1 800 555 0126</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© 2026 WC26 Billets. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Mentions légales</a>
              <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
