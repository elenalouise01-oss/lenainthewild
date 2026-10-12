# Lena in the Wild: notes for Claude

Lena's personal brand site (www.lenainthewild.com). Next.js App Router, Tailwind,
deployed by Vercel on every push to `main`. All copy lives in `content/site.ts`
and `content/journal.ts`.

## Lena's preferences

- **Home page and My Story copy:** propose changes and get Lena's approval before
  changing any visible wording. Offer pages, Who I Help (/life-design) and the
  FAQ can be updated, but show substantial new copy first.
- **Her name:** "Lena" on every page. "Elena Louise" appears only as a hidden
  alternate name in structured data. Never use her surname anywhere.
- **Niche:** reconnect with yourself, release the patterns keeping you stuck,
  create a life that feels like yours.
- **Words to avoid:**
  - "looks good on paper" (use "the life you thought you wanted")
  - "sold to want"
  - "coach" as her positioning
- **Don't invent anything:** no features, prices, testimonials, credentials or
  personal experiences. The 5 Day Reconnect is $33 audio; The Freedom Frequency
  is $555 with the waitlist open.
- **Journal URLs:** never change a published article's slug without adding a
  permanent redirect.
- **Pushing:** push to `main` only. Pushing the same commit to two branches at
  once made Vercel fail with "Git information retrieval failed".

## Saved for later (only when Lena says she's ready)

- **Offer page headings:** Lena would like her offer pages (/freedom-frequency,
  /5-day-reconnect) to use section headings like the ones on
  https://www.beladivine.com/programs. Use them as a structural reference only.
  Don't copy that brand's wording, offer names or messaging. That site couldn't
  be opened from the cloud environment, so ask Lena for a screenshot or the
  heading list.
- **Link style:** Lena isn't keen on the lilac underline on text links. Options
  A–D were mocked up (A: fine brown line, B: arrow only, C: editorial dash,
  D: outline pill). Waiting on her choice.
