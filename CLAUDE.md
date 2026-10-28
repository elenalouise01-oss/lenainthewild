# Lena in the Wild: notes for Claude

Lena's personal brand site (www.lenainthewild.com). Next.js App Router, Tailwind,
deployed by Vercel on every push to `main`. All copy lives in `content/site.ts`
and `content/journal.ts`.

## Lena's preferences

- **Always show Lena the exact wording first.** Before changing any visible
  copy, Google title or description, show her the exact text and wait for her
  yes. This applies to every page.
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
  personal experiences. The 5 Day Reconnect is $33 AUD audio; The Freedom Frequency
  is $777 AUD with the waitlist open.
- **Journal URLs:** never change a published article's slug without adding a
  permanent redirect.
- **Batch changes:** save and commit changes locally, and only push when Lena
  says "push". Every push deploys the live site.
- **Waitlist:** The Freedom Frequency waitlist form emails each sign-up to
  nalurisocials@gmail.com (Web3Forms) and adds a row to Lena's "Freedom
  Frequency Waitlist" Google Sheet (Apps Script URL in `waitlistSheetUrl`).
  Substack links go to https://substack.com/@lenainthewild.
- **Free tapping tutorial (lead magnet):** home page section + pop-up
  (`components/sections/LeadMagnet.tsx`, copy in `leadMagnet`). The video is
  Lena's YouTube Short (ftCp6dJRSZo) and plays in the pop-up after sign-up.
  Sign-ups email nalurisocials@gmail.com (Web3Forms) and go to Lena's "Free
  Tutorial Sign-ups" Google Sheet (`tutorialSheetUrl`), whose Apps Script also
  emails each person the video link from Lena's Gmail.
- **Pushing:** push to `main` only. Pushing the same commit to two branches at
  once made Vercel fail with "Git information retrieval failed".

## Saved for later (only when Lena says she's ready)

- **Offer page headings:** Lena would like her offer pages (/freedom-frequency,
  /5-day-reconnect) to use this section structure, which she likes from
  beladivine.com/programs. Copy the structure only, never that brand's
  wording. The headings, in order:
  1. **What it is**
  2. **How it's delivered**
  3. **Who it's for**
  4. **Its length**
  5. **High-level description**
  6. **Major outcomes** ("By the end, you will…" bullets)

  Ask Lena for any facts the site doesn't already state: delivery format,
  length or duration, and outcomes for The Freedom Frequency. Don't invent
  them. The 5 Day Reconnect is known: five short audio sessions, one a day, a
  few minutes each, self-paced, $33 AUD via The Leap.
- **The Freedom Frequency details (from Lena, for the offer page):**
  - **Format:** a self-paced online experience in a private course portal,
    accessed on computer or phone. The platform isn't confirmed (possibly The
    Leap), so don't name it on the site.
  - **Inside:** video lessons, guided audio practices (reflection,
    visualisation, gentle somatic awareness), a digital workbook, an
    integration exercise per module, and built-in accountability (progress
    trackers, commitments, reflection prompts).
  - **Not included:** no live calls or community. Never imply either.
  - **Length:** a six-week guided journey (five core modules plus an
    integration week), self-paced with a suggested weekly rhythm and no
    deadline. Each module has 3–5 video lessons of about 5–10 minutes, plus
    audio, journalling prompts and exercises; around 1–2 hours a week:
    1. Reconnect
    2. Understand
    3. Release
    4. Rediscover
    5. Recreate
    6. Integrate (reflect on progress, create a personal freedom plan with
       practical next steps)
- **Link style:** Lena isn't keen on the lilac underline on text links. Options
  A–D were mocked up (A: fine brown line, B: arrow only, C: editorial dash,
  D: outline pill). Waiting on her choice.

## Parked idea: the third step (Naluri Socials) — not built yet

Lena's idea (22 Oct 2026, from her notes and a voice memo). She's not ready to
build it out; keep it in mind and don't add anything to the site until she says.

- The journey: **5 Day Reconnect** (reconnect) → **The Freedom Frequency** (heal
  the blocks/triggers, work out the life you want) → **new offer**: build a
  personal brand / online business on your own terms, through social media.
- It is NOT a social media service and NOT a separate business: it feeds into
  Lena in the Wild. Her story: stuck in the hustle/system → personal brand → a
  business aligned with her values, freedom first.
- Includes how she uses AI to reclaim time (website, reels, carousels, skills,
  video editing) while staying authentic, not generic "AI slop". Most of her
  audience want their own remote/online business.
- When she's ready: add it to the offers carousel as "Coming soon" (maybe with
  a waitlist). Still to decide: name (options given: Naluri Socials / Build
  Your Freedom Brand / The Freedom Business), sticker + Learn more wording
  (a draft was shown, not approved), cover art (monkey style), waitlist or not.
- Possible journal tab later for the business side (e.g. "building freedom").
- The heart of it, in Lena's words: she became obsessed with freedom, with
  creating a business that lets her travel and work whenever she wants. So she
  started spending all her time learning AI: how to speed up what she was
  already doing with social media, how to create, and how to turn all her
  offerings into what she wanted through AI.

## Photography page (/photography): for women only
Lena confirmed (28 Oct 2026) the photography experience ("Let me reintroduce
myself", Naluri Photography working name) is just for women. Unlike the rest
of the site (gender-neutral), this page can use feminine language ("her",
"hype woman", feminine energy).
