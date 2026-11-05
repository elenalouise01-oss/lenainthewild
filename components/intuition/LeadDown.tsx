import DrawnLine from '@/components/DrawnLine';

// A dashed doodle line between two sections of a result: it starts under the
// section above, makes one little loop and points straight down at the next
// heading (which sits on the left), so the eye follows it down the page.
export default function LeadDown() {
  return (
    <DrawnLine
      viewBox="0 0 220 120"
      d="M150 6 C 150 34, 120 50, 96 46 C 74 42, 76 20, 96 24 C 122 30, 108 74, 62 86 C 40 92, 28 100, 26 112"
      arrow="M16 102 L26 116 L36 102"
      className="my-4 ml-1 block h-24 w-44 sm:my-6 sm:h-28 sm:w-52"
    />
  );
}
