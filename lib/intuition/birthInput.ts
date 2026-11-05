// Validation for the birth details form. Shared by the browser (instant,
// friendly messages) and the server (the check that counts).

export type BirthInput = {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM, 24-hour
  placeId: number;
  // Only when clocks went back that night and the time happened twice:
  // which of the two offsets (in minutes from UTC) applied.
  offsetMinutes?: number;
};

export type FieldErrors = Partial<Record<'date' | 'time' | 'place', string>>;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const EARLIEST_YEAR = 1900;

export function parseDate(date: string): { year: number; month: number; day: number } | null {
  const m = DATE_RE.exec(date);
  if (!m) return null;
  const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return { year, month, day };
}

export function parseTime(time: string): { hour: number; minute: number } | null {
  const m = TIME_RE.exec(time);
  return m ? { hour: Number(m[1]), minute: Number(m[2]) } : null;
}

export function validateBirthInput(input: Partial<Record<keyof BirthInput, unknown>>, now = new Date()): FieldErrors {
  const errors: FieldErrors = {};

  if (typeof input.date !== 'string' || !input.date) {
    errors.date = 'Please add your date of birth.';
  } else {
    const d = parseDate(input.date);
    if (!d) errors.date = 'That date doesn’t look right. Please check the day, month and year.';
    else if (d.year < EARLIEST_YEAR) errors.date = `Please choose a date from ${EARLIEST_YEAR} onwards.`;
    else if (Date.UTC(d.year, d.month - 1, d.day) > now.getTime()) errors.date = 'Your birth date can’t be in the future.';
  }

  if (typeof input.time !== 'string' || !input.time) {
    errors.time = 'Please add your birth time. Your best guess is OK, and you can always come back with the exact one.';
  } else if (!parseTime(input.time)) {
    errors.time = 'Please enter the time as hours and minutes, like 14:30.';
  }

  if (typeof input.placeId !== 'number' || !Number.isInteger(input.placeId) || input.placeId <= 0) {
    errors.place = 'Please search for your birth town or city and pick it from the list.';
  }

  if (input.offsetMinutes !== undefined && (typeof input.offsetMinutes !== 'number' || !Number.isInteger(input.offsetMinutes) || Math.abs(input.offsetMinutes) > 16 * 60)) {
    errors.time = 'Please choose which of the two times applies.';
  }

  return errors;
}
