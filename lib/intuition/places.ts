import data from './data/places.json';

// Birthplace lookup from a bundled copy of GeoNames (places with 5,000+
// people), so no birth details are sent to an outside geocoding service.
// Each place carries its IANA time zone, which is all a Human Design chart
// needs from the birthplace: the chart is geocentric, so the place only
// matters for turning local clock time into UTC.

export type Place = {
  id: number;
  name: string;
  region: string;
  country: string;
  countryCode: string;
  timeZone: string;
  label: string;
};

type Row = [number, string, string, string, number, number, string];

const COUNTRIES = data.countries as Record<string, string>;
const ZONES = data.timeZones as string[];
const ROWS = data.places as Row[];

// Everyday names people type for a country
const COUNTRY_ALIASES: Record<string, string> = {
  uk: 'GB', england: 'GB', scotland: 'GB', wales: 'GB', 'northern ireland': 'GB', britain: 'GB', 'great britain': 'GB',
  usa: 'US', us: 'US', america: 'US', 'united states of america': 'US',
  uae: 'AE', holland: 'NL', 'the netherlands': 'NL', 'south korea': 'KR', korea: 'KR', russia: 'RU', vietnam: 'VN',
  'czech republic': 'CZ', czechia: 'CZ', 'ivory coast': 'CI', 'hong kong': 'HK', 'new zealand': 'NZ', nz: 'NZ', aus: 'AU',
};

export function fold(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

type Indexed = { row: Row; names: string[]; region: string; country: string; cc: string };

let index: Indexed[] | null = null;

function getIndex(): Indexed[] {
  if (!index) {
    index = ROWS.map((row) => ({
      row,
      names: [row[1], ...(row[6] ? row[6].split('|') : [])].map(fold),
      region: fold(row[2]),
      country: fold(COUNTRIES[row[3]] ?? ''),
      cc: row[3].toLowerCase(),
    }));
  }
  return index;
}

function toPlace(row: Row): Place {
  const country = COUNTRIES[row[3]] ?? row[3];
  const region = row[2] && row[2] !== row[1] ? row[2] : '';
  return {
    id: row[0],
    name: row[1],
    region,
    country,
    countryCode: row[3],
    timeZone: ZONES[row[4]],
    label: [row[1], region, country].filter(Boolean).join(', '),
  };
}

// "Sydney", "sydney australia", "Springfield, Illinois", "Perth, Scotland"
export function searchPlaces(query: string, limit = 8): Place[] {
  const parts = query.split(',').map(fold).filter(Boolean);
  if (!parts.length || parts[0].length < 2) return [];
  let [city, ...rest] = parts;
  let qualifier = rest.join(' ');

  // "sydney australia" with no comma: try peeling a country or region off the end
  if (!rest.length && city.includes(' ')) {
    const words = city.split(' ');
    for (let i = 1; i < words.length; i++) {
      const tail = words.slice(i).join(' ');
      if (COUNTRY_ALIASES[tail] || Object.values(COUNTRIES).some((c) => fold(c) === tail)) {
        city = words.slice(0, i).join(' ');
        qualifier = tail;
        break;
      }
    }
  }

  const aliasCc = COUNTRY_ALIASES[qualifier]?.toLowerCase();
  const matchesQualifier = (p: Indexed) =>
    !qualifier ||
    p.cc === aliasCc ||
    p.cc === qualifier ||
    p.country.startsWith(qualifier) ||
    p.region.startsWith(qualifier) ||
    qualifier.split(' ').every((w) => p.country.includes(w) || p.region.includes(w));

  const scored: { p: Indexed; score: number }[] = [];
  for (const p of getIndex()) {
    let score = 0;
    for (const n of p.names) {
      if (n === city) score = Math.max(score, 3);
      else if (n.startsWith(city)) score = Math.max(score, 2);
      else if (city.length >= 4 && n.includes(` ${city}`)) score = Math.max(score, 1);
    }
    if (score && matchesQualifier(p)) scored.push({ p, score });
  }
  // Rows are stored biggest first, so a stable sort keeps big places on top
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => toPlace(s.p.row));
}

export function placeById(id: number): Place | null {
  const row = ROWS.find((r) => r[0] === id);
  return row ? toPlace(row) : null;
}

export const PLACES_ATTRIBUTION = data.source as string;
