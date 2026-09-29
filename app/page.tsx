import Footer from '@/components/Footer';
import Blog from '@/components/sections/Blog';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Section1 from '@/components/sections/Section1';
import { ComeSayHi, LetsTalk, Offers } from '@/components/sections/Section3';
import { About, BigIdea, Journey, OnTheRoadList, QuoteBreak, Welcome, WordStrip } from '@/components/draft/Sections';

// DRAFT layout, modelled on the Naluri Socials site: calm light sections
// with one strong headline each, dark bands for emphasis, and the signature
// pieces kept (hero, LIFE, album offers, envelope).
export default function Home() {
  return (
    <main>
      <Hero washClassName="bg-sand" />
      <WordStrip />
      <Welcome />
      <Section1 hideWelcome />
      <About />
      <BigIdea />
      <OnTheRoadList />
      <Offers />
      <Journey />
      <QuoteBreak />
      <Blog />
      <Newsletter />
      <ComeSayHi />
      <LetsTalk />
      <Footer />
    </main>
  );
}
