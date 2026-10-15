// A dashed flight path from Sydney that swoops down to Bali, landing on the
// photo of Lena with her suitcase just below. Decorative.
export default function FlightPath() {
  return (
    <div aria-hidden="true" className="relative mx-auto -mb-6 mt-2 h-28 w-full sm:h-32">
      <svg viewBox="0 0 400 130" fill="none" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M24 70 C 110 -6, 290 -10, 360 124"
          stroke="#a97bb5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="7 8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="absolute left-0 top-[52%] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-bark" />
      <span className="absolute left-0 top-[22%] font-script text-lg text-bark sm:text-xl">Sydney</span>
      {/* the plane, heading down towards Bali */}
      <span className="absolute bottom-0 right-[6%] rotate-[125deg] text-2xl leading-none text-bark sm:right-[8%]">✈︎</span>
      <span className="absolute right-0 top-[18%] font-script text-lg text-bark sm:right-[2%] sm:text-xl">Bali</span>
    </div>
  );
}
