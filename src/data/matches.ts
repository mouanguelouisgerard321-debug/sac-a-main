export interface Match {
  id: string;
  teamA: string;
  flagA: string;
  teamB: string;
  flagB: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  priceFrom: number;
  round: string;
}

export const matches: Match[] = [
  {
    id: 'm1',
    teamA: 'États-Unis',
    flagA: '🇺🇸',
    teamB: 'Mexique',
    flagB: '🇲🇽',
    date: '11 juin 2026',
    time: '20:00',
    stadium: 'MetLife Stadium',
    city: 'New York / New Jersey',
    priceFrom: 180,
    round: 'Match d\'ouverture',
  },
  {
    id: 'm2',
    teamA: 'Brésil',
    flagA: '🇧🇷',
    teamB: 'Argentine',
    flagB: '🇦🇷',
    date: '13 juin 2026',
    time: '18:00',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    priceFrom: 220,
    round: 'Phase de groupes',
  },
  {
    id: 'm3',
    teamA: 'France',
    flagA: '🇫🇷',
    teamB: 'Allemagne',
    flagB: '🇩🇪',
    date: '15 juin 2026',
    time: '21:00',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    priceFrom: 195,
    round: 'Phase de groupes',
  },
  {
    id: 'm4',
    teamA: 'Espagne',
    flagA: '🇪🇸',
    teamB: 'Portugal',
    flagB: '🇵🇹',
    date: '17 juin 2026',
    time: '16:00',
    stadium: 'Estadio Azteca',
    city: 'Mexico',
    priceFrom: 160,
    round: 'Phase de groupes',
  },
  {
    id: 'm5',
    teamA: 'Angleterre',
    flagA: '🏴',
    teamB: 'Belgique',
    flagB: '🇧🇪',
    date: '19 juin 2026',
    time: '19:00',
    stadium: 'BC Place',
    city: 'Vancouver',
    priceFrom: 175,
    round: 'Phase de groupes',
  },
  {
    id: 'm6',
    teamA: 'Canada',
    flagA: '🇨🇦',
    teamB: 'Maroc',
    flagB: '🇲🇦',
    date: '21 juin 2026',
    time: '17:00',
    stadium: 'BMO Field',
    city: 'Toronto',
    priceFrom: 140,
    round: 'Phase de groupes',
  },
];
