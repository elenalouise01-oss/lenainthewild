import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { authorities, AUTHORITY_FOR } from '@/content/intuitionBlueprint';
import { validateBirthInput } from './birthInput';
import { bodygraph, CHANNELS, determineAuthority, determineType, gateAndLine, GATE_CENTER, type AuthorityKey, type Center } from './bodygraph';
import { calculateChart } from './calculate';
import { isValidEmail } from './email';
import { designMoment, longitudes } from './ephemeris';
import fixture from './fixtures/swiss-ephemeris-charts.json';
import { guideEmail } from './guideEmail';
import { searchPlaces } from './places';
import { localToUtc } from './timezone';

// Run with: npm test

// Builds the defined centres for a list of channels, as the chart would.
function defined(channels: [number, number][]) {
  return new Set<Center>(channels.flatMap(([a, b]) => [GATE_CENTER[a], GATE_CENTER[b]]));
}
const authorityOf = (channels: [number, number][]) => determineAuthority(defined(channels), channels);
const typeOf = (channels: [number, number][]) => determineType(defined(channels), channels);

describe('bodygraph tables', () => {
  it('places every one of the 64 gates in exactly one centre', () => {
    const gates = Object.keys(GATE_CENTER).map(Number).sort((a, b) => a - b);
    assert.deepEqual(gates, Array.from({ length: 64 }, (_, i) => i + 1));
  });

  it('has 36 channels, each joining two different centres', () => {
    assert.equal(CHANNELS.length, 36);
    for (const [a, b] of CHANNELS) assert.notEqual(GATE_CENTER[a], GATE_CENTER[b]);
  });

  it('maps longitudes onto the gate wheel', () => {
    assert.deepEqual(gateAndLine(302), { gate: 41, line: 1 });
    assert.deepEqual(gateAndLine(302 + 5.625), { gate: 19, line: 1 });
    assert.deepEqual(gateAndLine(301.99), { gate: 60, line: 6 });
    assert.deepEqual(gateAndLine(0), { gate: 25, line: 2 }); // 0° Aries falls in gate 25
    assert.deepEqual(gateAndLine(359.999 + 0.5), gateAndLine(0.499));
  });
});

describe('authority rules', () => {
  it('Solar Plexus defined → Emotional, whatever else is defined', () => {
    assert.equal(authorityOf([[6, 59], [34, 57]]), 'emotional');
  });
  it('Sacral without Solar Plexus → Sacral', () => {
    assert.equal(authorityOf([[34, 57], [5, 15]]), 'sacral');
  });
  it('Spleen without Sacral or Solar Plexus → Splenic', () => {
    assert.equal(authorityOf([[16, 48]]), 'splenic');
  });
  it('Heart to Throat → Ego Manifested; Heart to G → Ego Projected', () => {
    assert.equal(authorityOf([[21, 45]]), 'ego-manifested');
    assert.equal(typeOf([[21, 45]]), 'Manifestor');
    assert.equal(authorityOf([[25, 51]]), 'ego-projected');
    assert.equal(typeOf([[25, 51]]), 'Projector');
  });
  it('G to Throat with no motor or awareness centre → Self-Projected', () => {
    assert.equal(authorityOf([[1, 8]]), 'self-projected');
  });
  it('Head, Ajna and Throat only → Mental', () => {
    assert.equal(authorityOf([[4, 63], [17, 62]]), 'mental');
    assert.equal(typeOf([[4, 63], [17, 62]]), 'Projector');
  });
  it('no definition at all → Lunar (Reflector)', () => {
    assert.equal(authorityOf([]), 'lunar');
    assert.equal(typeOf([]), 'Reflector');
  });
  it('tells Generators from Manifesting Generators', () => {
    assert.equal(typeOf([[5, 15]]), 'Generator');
    assert.equal(typeOf([[20, 34]]), 'Manifesting Generator');
    // A motor reaching the Throat through another centre (Root → Spleen → Throat)
    assert.equal(typeOf([[18, 58], [16, 48]]), 'Manifestor');
    assert.equal(authorityOf([[18, 58], [16, 48]]), 'splenic');
  });
});

describe('matches Swiss Ephemeris', () => {
  const charts = (fixture as { charts: { utc: number; authority: AuthorityKey; type: string; profile: string; gates: number[] }[] }).charts;

  it(`gives the same authority, type and profile for all ${charts.length} reference charts`, () => {
    let gateDiffs = 0;
    for (const c of charts) {
      const birth = new Date(c.utc);
      const bg = bodygraph(longitudes(birth), longitudes(designMoment(birth)));
      const label = birth.toISOString();
      assert.equal(bg.authority, c.authority, `authority for ${label}`);
      assert.equal(bg.type, c.type, `type for ${label}`);
      assert.equal(bg.profile, c.profile, `profile for ${label}`);
      const gates = [...new Set([...bg.personality, ...bg.design].map((a) => a.gate))].sort((a, b) => a - b);
      if (gates.join() !== c.gates.join()) gateDiffs++;
    }
    // A planet sitting within arcseconds of a gate edge can land either side
    assert.ok(gateDiffs <= 2, `${gateDiffs} charts with a different gate`);
  });
});

describe('published charts, end to end from local birth details', () => {
  const place = (q: string) => {
    const p = searchPlaces(q)[0];
    assert.ok(p, `found ${q}`);
    return p.id;
  };
  const cases = [
    // Ra Uru Hu, founder of Human Design: 5/1 Splenic Manifestor (Jovian Archive birth data)
    { q: 'Montreal, Canada', date: '1948-04-09', time: '00:05', type: 'Manifestor', profile: '5/1', authority: 'splenic' },
    // Barack Obama: published as an Emotional Projector
    { q: 'Honolulu', date: '1961-08-04', time: '19:24', type: 'Projector', authority: 'emotional' },
    // Steve Jobs: published as a 6/3 Emotional Generator
    { q: 'San Francisco', date: '1955-02-24', time: '19:15', type: 'Generator', profile: '6/3', authority: 'emotional' },
  ];
  for (const c of cases) {
    it(`${c.q} ${c.date} ${c.time} → ${c.type} ${c.authority}`, () => {
      const out = calculateChart({ date: c.date, time: c.time, placeId: place(c.q) });
      assert.equal(out.status, 'ok');
      if (out.status !== 'ok') return;
      assert.equal(out.chart.type, c.type);
      assert.equal(out.chart.authority, c.authority);
      if (c.profile) assert.equal(out.chart.profile, c.profile);
    });
  }
});

describe('time zones', () => {
  it('uses the daylight-saving rules in force on the birth date', () => {
    const before = localToUtc({ year: 1970, month: 12, day: 1, hour: 12, minute: 0 }, 'Australia/Sydney');
    const after = localToUtc({ year: 1971, month: 12, day: 1, hour: 12, minute: 0 }, 'Australia/Sydney');
    assert.equal(before.kind === 'ok' && before.offsetMinutes, 600); // NSW had no daylight saving in 1970
    assert.equal(after.kind === 'ok' && after.offsetMinutes, 660);
  });
  it('flags a time skipped when the clocks went forward', () => {
    assert.equal(localToUtc({ year: 2023, month: 10, day: 1, hour: 2, minute: 30 }, 'Australia/Sydney').kind, 'skipped');
  });
  it('asks which one when the clocks went back and a time happened twice', () => {
    const r = localToUtc({ year: 2023, month: 4, day: 2, hour: 2, minute: 30 }, 'Australia/Sydney');
    assert.equal(r.kind, 'ambiguous');
    if (r.kind === 'ambiguous') assert.deepEqual(r.options.map((o) => o.offsetMinutes), [660, 600]);
  });
  it('turns that into a question for the visitor, then calculates with their answer', () => {
    const sydney = searchPlaces('Sydney, Australia')[0].id;
    const ask = calculateChart({ date: '2023-04-02', time: '02:30', placeId: sydney });
    assert.equal(ask.status, 'ambiguous-time');
    assert.equal(calculateChart({ date: '2023-04-02', time: '02:30', placeId: sydney, offsetMinutes: 600 }).status, 'ok');
    assert.equal(calculateChart({ date: '2023-10-01', time: '02:30', placeId: sydney }).status, 'skipped-time');
  });
});

describe('birth details validation', () => {
  const ok = { date: '1987-06-15', time: '14:30', placeId: 2147714 };
  it('accepts complete details', () => assert.deepEqual(validateBirthInput(ok), {}));
  it('rejects missing or impossible values', () => {
    assert.ok(validateBirthInput({ ...ok, date: '' }).date);
    assert.ok(validateBirthInput({ ...ok, date: '2023-02-30' }).date);
    assert.ok(validateBirthInput({ ...ok, date: '1850-01-01' }).date);
    assert.ok(validateBirthInput({ ...ok, date: '2999-01-01' }).date);
    assert.ok(validateBirthInput({ ...ok, time: '' }).time);
    assert.ok(validateBirthInput({ ...ok, time: '25:00' }).time);
    assert.ok(validateBirthInput({ ...ok, placeId: undefined }).place);
    assert.ok(validateBirthInput({ ...ok, placeId: 'Sydney' as unknown as number }).place);
  });
  it('never calculates from invalid details', () => {
    assert.equal(calculateChart({ date: '2023-02-30', time: '10:00', placeId: 2147714 }).status, 'invalid');
    assert.equal(calculateChart({ date: '1990-01-01', time: '10:00', placeId: 999999999 }).status, 'invalid');
  });
});

describe('birthplace search', () => {
  it('finds big cities first', () => {
    assert.match(searchPlaces('Sydney')[0].label, /^Sydney, New South Wales, Australia$/);
    assert.match(searchPlaces('sydney australia')[0].label, /Australia$/);
  });
  it('narrows by region or country after a comma', () => {
    assert.match(searchPlaces('Springfield, Illinois')[0].label, /Illinois/);
    assert.match(searchPlaces('Perth, Scotland')[0].label, /Scotland|United Kingdom/);
  });
  it('ignores accents and knows common former names', () => {
    assert.ok(searchPlaces('Sao Paulo').some((p) => p.name === 'São Paulo'));
    assert.ok(searchPlaces('Bangalore').some((p) => p.name === 'Bengaluru'));
  });
  it('includes smaller towns', () => {
    assert.equal(searchPlaces('Ubud')[0].timeZone, 'Asia/Makassar');
  });
});

describe('content and email', () => {
  const keys: AuthorityKey[] = ['emotional', 'sacral', 'splenic', 'ego-manifested', 'ego-projected', 'self-projected', 'mental', 'lunar'];
  it('has a complete guide for every authority a chart can give', () => {
    for (const k of keys) {
      const a = authorities[AUTHORITY_FOR[k]];
      assert.ok(a.name && a.oneLine && a.meaning.length && a.decisions.length, k);
      assert.ok(a.prompts.length >= 3 && a.exercise.steps.length >= 3, k);
    }
  });
  it('emails the guide for the authority that was calculated', () => {
    for (const k of keys) {
      const a = authorities[AUTHORITY_FOR[k]];
      const mail = guideEmail(k, 'Sam');
      assert.ok(mail.subject.includes(a.name));
      assert.ok(mail.html.includes(a.exercise.title.replace(/’/g, '’')));
      assert.ok(mail.text.startsWith('Hi Sam,'));
    }
    assert.ok(guideEmail('ego-projected').html.includes('Ego Projected'));
  });
  it('escapes names in the email', () => {
    assert.ok(!guideEmail('sacral', '<b>x</b>').html.includes('<b>x</b>'));
  });
  it('checks email addresses', () => {
    assert.ok(isValidEmail('hello@example.com'));
    for (const bad of ['', 'hello', 'a@b', 'a @b.com', 'a@b.c', 123]) assert.ok(!isValidEmail(bad), String(bad));
  });
});
