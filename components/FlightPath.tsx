// A dashed flight path like a doodle on a map: from Sydney (bottom right) up
// and over to Bali (to the north-west, on the left), landing just above the
// "Moving to Bali" chapter. Decorative.
export default function FlightPath() {
  return (
    <div aria-hidden="true" className="relative mx-auto mb-1 mt-4 h-32 w-full sm:h-36">
      <svg viewBox="0 0 400 140" fill="none" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[78%] w-full">
        <path
          d="M352 104 C 300 10, 120 -6, 52 88"
          stroke="#3b2d0e"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="7 8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Sydney: where the line starts */}
      <span className="absolute right-[11%] top-[56%] h-2.5 w-2.5 rounded-full bg-bark" />
      <span className="absolute right-[3%] top-[72%] whitespace-nowrap font-script text-lg leading-none text-bark sm:text-xl">Sydney</span>
      {/* the plane coming in to land in Bali */}
      <span className="absolute left-[9%] top-[44%] rotate-[200deg] text-2xl leading-none text-bark">✈︎</span>
      <span className="absolute left-[2%] top-[72%] whitespace-nowrap font-script text-lg leading-none text-bark sm:text-xl">Bali</span>
    </div>
  );
}
