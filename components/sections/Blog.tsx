import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { blog } from '@/content/site';

export default function Blog() {
  return (
    <section id="blog" className="bg-cream px-6 py-32 sm:py-44">
      <div className="container-editorial text-center">
        <ScrollReveal>
          <SectionLabel>{blog.eyebrow}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-display-3 italic text-bark">{blog.headline}</h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-14 text-left sm:grid-cols-3 sm:gap-12">
          {blog.posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={0.1 * i}>
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-stone">
                {post.category}
              </p>
              <h3 className="mt-3 font-display text-2xl text-bark">{post.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-umber">{post.excerpt}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <Link
            href={blog.ctaHref}
            className="mt-20 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
          >
            {blog.cta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
