import Link from 'next/link';

// End of an offer page: points to the other offer for anyone this one isn't
// right for yet, and back to all the offers.
export default function OfferNextStep({ lead, label, href }: { lead: string; label: string; href: string }) {
  return (
    <section className="bg-sand px-6 py-16 text-center sm:py-20">
      <p className="font-display text-2xl italic text-bark sm:text-3xl">{lead}</p>
      <Link
        href={href}
        className="mt-6 inline-block py-2 font-body text-xs font-semibold uppercase tracking-wider text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark sm:tracking-widest2"
      >
        {label}{'\u00a0'}→
      </Link>
      <p className="mt-8">
        <Link href="/#freedom-seeker" className="inline-block py-1.5 font-body text-sm text-bark/70 transition-colors hover:text-bark">
          ← See all offers
        </Link>
      </p>
    </section>
  );
}
