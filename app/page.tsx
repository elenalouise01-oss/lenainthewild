import Footer from '@/components/Footer';
import Blog from '@/components/sections/Blog';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Section1 from '@/components/sections/Section1';
import Section2 from '@/components/sections/Section2';
import Section3 from '@/components/sections/Section3';

export default function Home() {
  return (
    <main>
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Blog />
      <Newsletter />
      <Footer />
    </main>
  );
}
