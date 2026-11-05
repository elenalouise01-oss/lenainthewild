// Turns a local birth date and clock time in a given place into the exact UTC
// moment, using the IANA time zone database built into the JavaScript runtime
// (Node's full ICU data). That database records each place's historical
// offsets and daylight-saving rules, so 1985 in Sydney uses 1985's rules, not
// today's. For a few places, records before 1970 are approximate.

export type LocalBirth = { year: number; month: number; day: number; hour: number; minute: number };

export type UtcResolution =
  | { kind: 'ok'; utc: Date; offsetMinutes: number }
  // Clocks went back that night, so this time happened twice.
  | { kind: 'ambiguous'; options: { utc: Date; offsetMinutes: number }[] }
  // Clocks jumped forward that night, so this time never showed on a clock.
  | { kind: 'skipped' };

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      era: 'short',
    });
    formatters.set(timeZone, f);
  }
  return f;
}

export function isValidTimeZone(timeZone: string): boolean {
  try {
    formatter(timeZone);
    return true;
  } catch {
    return false;
  }
}

// The offset from UTC, in minutes, that clocks in `timeZone` showed at `instant`.
export function offsetAt(timeZone: string, instant: number): number {
  const parts = Object.fromEntries(formatter(timeZone).formatToParts(new Date(instant)).map((p) => [p.type, p.value]));
  let year = Number(parts.year);
  if (parts.era === 'BC' || parts.era === 'B') year = 1 - year;
  const asUtc = Date.UTC(year, Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
  // Round away the seconds that local mean time offsets can carry
  return Math.round((asUtc - Math.floor(instant / 1000) * 1000) / 60_000);
}

export function localToUtc(local: LocalBirth, timeZone: string): UtcResolution {
  const wall = Date.UTC(local.year, local.month - 1, local.day, local.hour, local.minute);
  // Every offset in force within a day and a half either side; a wall-clock
  // time is valid under an offset if converting back gives the same offset.
  const offsets = new Set([-36, -12, 0, 12, 36].map((h) => offsetAt(timeZone, wall + h * 3_600_000)));
  const valid = [...offsets]
    .map((offsetMinutes) => ({ utc: new Date(wall - offsetMinutes * 60_000), offsetMinutes }))
    .filter((o) => offsetAt(timeZone, o.utc.getTime()) === o.offsetMinutes)
    .sort((a, b) => a.utc.getTime() - b.utc.getTime());
  if (valid.length === 0) return { kind: 'skipped' };
  if (valid.length === 1) return { kind: 'ok', ...valid[0] };
  return { kind: 'ambiguous', options: valid };
}

export function formatOffset(offsetMinutes: number): string {
  const sign = offsetMinutes < 0 ? '−' : '+';
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}
