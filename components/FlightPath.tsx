// A dashed flight path like a doodle on a map: from Sydney (bottom right) it
// climbs up to Bali (north-west, top left), just above the "Moving to Bali"
// chapter. Decorative.
export default function FlightPath() {
  return (
    <div aria-hidden="true" className="relative mx-auto mb-2 mt-4 h-36 w-full sm:h-40">
      <svg viewBox="0 0 400 160" fill="none" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M346 128 C 300 120, 230 104, 170 76 C 120 52, 84 40, 62 30"
          stroke="#3b2d0e"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="7 8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Sydney: where the line starts, bottom right */}
      <span className="absolute right-[12%] top-[77%] h-2.5 w-2.5 rounded-full bg-bark" />
      <span className="absolute right-[3%] top-[86%] whitespace-nowrap font-script text-lg leading-none text-bark sm:text-xl">Sydney</span>
      {/* the plane arriving in Bali, top left, pointing up the line */}
      <span className="absolute left-[10%] top-[8%] -rotate-[155deg] text-2xl leading-none text-bark">✈︎</span>
      <span className="absolute left-[2%] top-0 whitespace-nowrap font-script text-lg leading-none text-bark sm:text-xl">Bali</span>
    </div>
  );
}
