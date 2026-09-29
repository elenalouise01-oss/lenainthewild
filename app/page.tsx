import Footer from '@/components/Footer';
import Blog from '@/components/sections/Blog';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Section1 from '@/components/sections/Section1';
import Section2 from '@/components/sections/Section2';
import { ComeSayHi, LetsTalk, NoteToSelf, Offers, OnTheRoad, WhyMe } from '@/components/sections/Section3';

// Know → like → trust → buy: who she is, her story, why her, the offers,
// a breather, her world, softer ways to stay close, then the contact.
export default function Home() {
  return (
    <main>
      <Hero />
      <Section1 />
      <Section2 />
      <WhyMe />
      <Offers />
      <NoteToSelf />
      <OnTheRoad />
      <Blog />
      <Newsletter />
      <ComeSayHi />
      <LetsTalk />
      <Footer />
    </main>
  );
}
