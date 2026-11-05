import * as Astronomy from 'astronomy-engine';
import { coord, deltat, elliptic, julian, nutation, planetposition, solar } from 'astronomia';
import earthData from 'astronomia/data/vsop87Bearth';
import mercuryData from 'astronomia/data/vsop87Bmercury';
import venusData from 'astronomia/data/vsop87Bvenus';
import marsData from 'astronomia/data/vsop87Bmars';
import jupiterData from 'astronomia/data/vsop87Bjupiter';
import saturnData from 'astronomia/data/vsop87Bsaturn';
import uranusData from 'astronomia/data/vsop87Buranus';
import neptuneData from 'astronomia/data/vsop87Bneptune';

// Planetary positions for a Human Design chart. Every longitude is geocentric,
// tropical and apparent (true ecliptic of date, corrected for light-time,
// aberration and nutation): the convention Swiss Ephemeris and mainstream
// Human Design software use.
//
// Two MIT-licensed libraries, each used where it matched Swiss Ephemeris most
// closely in a 3,000-chart comparison (see docs/intuition-blueprint.md):
//   - astronomia (full VSOP87): Sun, Mercury to Neptune, within 3 arcseconds
//   - astronomy-engine: Moon and Pluto (within 4"), and the true lunar node
//     (within 50"; 10" on average)
// A Human Design gate is 5.625° wide (20,250"), so these differences only
// matter when a planet sits right on the edge of a gate.

export const BODIES = [
  'sun',
  'earth',
  'northNode',
  'southNode',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
] as const;

export type Body = (typeof BODIES)[number];

const DEG = 180 / Math.PI;

const EARTH = new planetposition.Planet(earthData);
const VSOP_PLANETS = {
  mercury: new planetposition.Planet(mercuryData),
  venus: new planetposition.Planet(venusData),
  mars: new planetposition.Planet(marsData),
  jupiter: new planetposition.Planet(jupiterData),
  saturn: new planetposition.Planet(saturnData),
  uranus: new planetposition.Planet(uranusData),
  neptune: new planetposition.Planet(neptuneData),
};

export function normalise(deg: number): number {
  const d = deg % 360;
  return d < 0 ? d + 360 : d;
}

// astronomia works in Julian Ephemeris Days (Terrestrial Time), so add ΔT.
function julianEphemerisDay(when: Date): number {
  const jd = 2440587.5 + when.getTime() / 86_400_000;
  const cal = julian.JDToCalendar(jd);
  return jd + deltat.deltaT(cal.year + (cal.month - 1) / 12) / 86_400;
}

function sunAt(jde: number): number {
  return normalise(solar.apparentVSOP87(EARTH, jde).lon * DEG);
}

export function sunLongitude(when: Date): number {
  return sunAt(julianEphemerisDay(when));
}

// The "true" (osculating) lunar node: where the Moon's instantaneous orbital
// plane crosses the true ecliptic of date. Human Design software uses the
// true node rather than the mean node.
function trueNodeLongitude(when: Date): number {
  const time = Astronomy.MakeTime(when);
  const state = Astronomy.GeoMoonState(time);
  const rot = Astronomy.Rotation_EQJ_ECT(time);
  const r = Astronomy.RotateVector(rot, new Astronomy.Vector(state.x, state.y, state.z, time));
  const v = Astronomy.RotateVector(rot, new Astronomy.Vector(state.vx, state.vy, state.vz, time));
  // Orbital angular momentum h = r × v; the ascending node lies along z × h.
  const hx = r.y * v.z - r.z * v.y;
  const hy = r.z * v.x - r.x * v.z;
  return normalise(Math.atan2(hx, -hy) * DEG);
}

export function longitudes(when: Date): Record<Body, number> {
  const jde = julianEphemerisDay(when);
  const [, deltaEpsilon] = nutation.nutation(jde);
  const trueObliquity = nutation.meanObliquity(jde) + deltaEpsilon;

  const sun = sunAt(jde);
  const node = trueNodeLongitude(when);
  const out = {
    sun,
    earth: normalise(sun + 180),
    northNode: node,
    southNode: normalise(node + 180),
    moon: normalise(Astronomy.EclipticGeoMoon(when).lon),
    pluto: normalise(Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Pluto, when, true)).elon),
  } as Record<Body, number>;

  for (const [name, planet] of Object.entries(VSOP_PLANETS)) {
    // Apparent geocentric right ascension and declination, then onto the
    // true ecliptic of date.
    const pos = elliptic.position(planet, EARTH, jde);
    const ecl = new coord.Equatorial(pos.ra, pos.dec).toEcliptic(trueObliquity);
    out[name as Body] = normalise(ecl.lon * DEG);
  }
  return out;
}

// The Design moment: when the Sun stood exactly 88° of longitude before its
// position at birth (roughly 88 to 92 days earlier). Found by Newton's method
// on the Sun's apparent longitude, which moves just under 1° a day.
export function designMoment(birth: Date): Date {
  const target = normalise(sunLongitude(birth) - 88);
  let t = birth.getTime() - 89 * 86_400_000;
  for (let i = 0; i < 30; i++) {
    const gap = ((target - sunLongitude(new Date(t)) + 540) % 360) - 180;
    if (Math.abs(gap) < 1e-7) break;
    // Speed from a one-hour difference, in degrees per millisecond
    const speed = (normalise(sunLongitude(new Date(t + 3_600_000)) - sunLongitude(new Date(t)) + 180) - 180) / 3_600_000;
    t += gap / speed;
  }
  const found = new Date(Math.round(t));
  const residual = Math.abs(((target - sunLongitude(found) + 540) % 360) - 180);
  if (residual > 1e-5) throw new Error('Could not find the Design moment');
  return found;
}
