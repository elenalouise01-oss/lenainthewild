import { bodygraph, CENTER_NAMES, type AuthorityKey, type HdType } from './bodygraph';
import { parseDate, parseTime, validateBirthInput, type BirthInput, type FieldErrors } from './birthInput';
import { designMoment, longitudes } from './ephemeris';
import { placeById } from './places';
import { formatOffset, localToUtc } from './timezone';

// Orchestrates one chart: validated birth details → place → UTC moment →
// planetary positions (birth and Design) → bodygraph → authority.

export type ChartSummary = {
  authority: AuthorityKey;
  type: HdType;
  profile: string;
  definedCenters: string[];
  // What was calculated, shown to the visitor so they can check it
  birth: {
    place: string;
    localTime: string; // "14 March 1990, 14:30"
    offset: string; // "UTC+11"
    utc: string; // ISO
    approximateHistory: boolean; // born before 1970: older clock records are less complete
  };
};

export type CalculateOutcome =
  | { status: 'ok'; chart: ChartSummary }
  | { status: 'invalid'; errors: FieldErrors }
  | { status: 'ambiguous-time'; options: { offsetMinutes: number; label: string }[] }
  | { status: 'skipped-time' };

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function calculateChart(input: Partial<Record<keyof BirthInput, unknown>>): CalculateOutcome {
  const errors = validateBirthInput(input);
  if (Object.keys(errors).length) return { status: 'invalid', errors };

  const date = parseDate(input.date as string)!;
  const time = parseTime(input.time as string)!;
  const place = placeById(input.placeId as number);
  if (!place) return { status: 'invalid', errors: { place: 'We couldn’t find that place. Please search for it again.' } };

  const resolved = localToUtc({ ...date, ...time }, place.timeZone);
  let utc: Date;
  let offsetMinutes: number;
  if (resolved.kind === 'skipped') return { status: 'skipped-time' };
  if (resolved.kind === 'ambiguous') {
    const pick = resolved.options.find((o) => o.offsetMinutes === input.offsetMinutes);
    if (!pick) {
      return {
        status: 'ambiguous-time',
        options: resolved.options.map((o, i) => ({
          offsetMinutes: o.offsetMinutes,
          label: `${i === 0 ? 'The first' : 'The second'} ${input.time} (${formatOffset(o.offsetMinutes)}, ${i === 0 ? 'before' : 'after'} the clocks went back)`,
        })),
      };
    }
    ({ utc, offsetMinutes } = pick);
  } else {
    ({ utc, offsetMinutes } = resolved);
  }

  const chart = bodygraph(longitudes(utc), longitudes(designMoment(utc)));

  return {
    status: 'ok',
    chart: {
      authority: chart.authority,
      type: chart.type,
      profile: chart.profile,
      definedCenters: chart.definedCenters.map((c) => CENTER_NAMES[c]),
      birth: {
        place: place.label,
        localTime: `${date.day} ${MONTHS[date.month - 1]} ${date.year}, ${input.time}`,
        offset: formatOffset(offsetMinutes),
        utc: utc.toISOString(),
        approximateHistory: date.year < 1970,
      },
    },
  };
}
