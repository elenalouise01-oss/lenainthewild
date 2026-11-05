// Minimal types for the parts of `astronomia` (MIT, no bundled types) used
// by lib/intuition/ephemeris.ts. Angles are radians; times are Julian days.
declare module 'astronomia' {
  export namespace planetposition {
    class Planet {
      constructor(data: unknown);
    }
  }
  export namespace solar {
    function apparentVSOP87(earth: planetposition.Planet, jde: number): { lon: number; lat: number; range: number };
  }
  export namespace elliptic {
    function position(planet: planetposition.Planet, earth: planetposition.Planet, jde: number): { ra: number; dec: number };
  }
  export namespace nutation {
    function nutation(jde: number): [number, number];
    function meanObliquity(jde: number): number;
  }
  export namespace coord {
    class Equatorial {
      constructor(ra: number, dec: number);
      toEcliptic(obliquity: number): { lon: number; lat: number };
    }
  }
  export namespace julian {
    function JDToCalendar(jd: number): { year: number; month: number; day: number };
  }
  export namespace deltat {
    function deltaT(decimalYear: number): number;
  }
}

declare module 'astronomia/data/*' {
  const data: unknown;
  export default data;
}
