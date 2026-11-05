# The Intuition Blueprint

A free, interactive lead magnet at **/intuition-blueprint**. Visitors enter their
birth date, time and place. The site calculates their real Human Design chart and
shows their Inner Authority, with an explanation, journal prompts and a practice.
They can then have the guide emailed to them.

## What you need to set up

The chart calculation needs **nothing**: no account, no API key, no monthly fee.

The **guide emails** need one Google Sheet with a small script, the same setup as
the free tapping practice. Until it's set up, the experience still works:
visitors see their full result on screen, and the email step is skipped. Nothing
ever claims an email was sent when it wasn't.

### Setting up the guide emails (about 10 minutes)

1. In Google Drive (logged in as the Gmail you want the emails to come from),
   create a Google Sheet called **Intuition Blueprint Sign-ups**.
2. In the sheet: **Extensions → Apps Script**. Delete what's there and paste in
   everything from `docs/intuition-blueprint-apps-script.gs`.
3. Make a secret: any long random string (e.g. from a password generator, 30+
   characters). Paste it into the script where it says
   `PASTE-THE-SAME-LONG-RANDOM-SECRET-HERE`. Save.
4. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access:
   **Anyone**. Click Deploy and allow the permissions it asks for (Sheets and
   Gmail). Copy the **Web app URL** (it ends in `/exec`).
5. In Vercel → the project → **Settings → Environment Variables**, add both for
   Production (and Preview if you like):
   - `INTUITION_GUIDE_SCRIPT_URL` = the Web app URL
   - `INTUITION_GUIDE_SCRIPT_SECRET` = the same secret as in the script
6. Redeploy (or push). Then try it yourself with your own email.

Each sign-up adds a row: date, email, first name, authority, whether they said
yes to marketing emails, and the exact consent wording they saw.

**Limits:** Gmail lets a script send about **100 emails a day** on a free Gmail
account (about 1,500 on Google Workspace). If the Blueprint takes off, move to an
email platform (below).

### Moving to an email platform later

There's no email marketing platform connected to the site yet. When you want one,
good fits are **Kit** (free up to 10,000 subscribers), **MailerLite** (free up to
1,000) or **Flodesk**. All three can send the guide automatically and tag people
by authority. `lib/intuition/delivery.ts` is the only file that would change.
Only import people whose sheet row says **Yes** for marketing emails.

## How the chart is calculated

- **Birthplace → time zone:** a bundled copy of GeoNames (69,000 places with
  5,000+ people, CC BY 4.0), so birth details never go to an outside service. A
  Human Design chart is geocentric, so the birthplace is only used to convert the
  local birth time to UTC.
- **Local time → UTC:** uses the IANA time zone database built into Node.js,
  including historical daylight-saving rules for the birth date. If the clocks
  went back that night (the time happened twice), the visitor is asked which one.
  If the clocks jumped forward (the time never existed), they're asked to check
  it. Before 1970, a few places' records are approximate, and the result page
  says so.
- **Planet positions:** two MIT-licensed astronomy libraries, `astronomia`
  (Sun, Mercury to Neptune) and `astronomy-engine` (Moon, Pluto and the true lunar
  node), for both the birth moment and the Design moment (when the Sun was 88°
  earlier).
- **Bodygraph → authority:** the standard gate wheel, centres, channels, and the
  authority hierarchy (Solar Plexus, Sacral, Spleen, Heart, G, then Mental, or
  Lunar for Reflectors).

### How it was checked

- Compared with **Swiss Ephemeris**, the engine behind mainstream Human Design
  software, on 3,000 random charts from 1925 to 2025: **0 differences** in
  authority, type or profile. Planet positions agree to within a few arcseconds;
  a gate is 20,250 arcseconds wide.
- Matches published charts: Ra Uru Hu (5/1 Splenic Manifestor), Barack Obama
  (Emotional Projector) and Steve Jobs (6/3 Emotional Generator).
- `npm test` runs 30 checks, including 300 Swiss Ephemeris reference charts
  (`lib/intuition/fixtures`), the published charts, time zone edge cases,
  validation and the email content.

### Why not an outside Human Design API?

Several paid APIs return an authority (e.g. Bodygraph Chart, Human Design API,
Human Design Hub, roughly US$10 to $50 a month, with free tiers of about 100
charts a month). Calculating on the site was chosen instead because:

- it costs nothing and has no monthly cap;
- birth details stay on the site instead of going to a third party;
- there's no outside service to go down;
- the result could be checked independently against Swiss Ephemeris.

Swiss Ephemeris itself wasn't used on the site because its licence (AGPL) would
require publishing the site's code or buying a commercial licence.

## Privacy

- Birth details are used for the calculation only. They aren't saved, logged or
  sent anywhere, including the guide email script. The email step sends them
  back to the site once so the guide always matches a real calculation.
- The sheet stores only the email, optional first name, authority and the
  marketing choice. Marketing consent is a separate, unticked box; the guide is
  sent either way.
- Visitors are told they can ask for their details to be deleted at
  nalurisocials@gmail.com.

## Editing the words

All copy, including the seven authority guides, is in
`content/intuitionBlueprint.ts`. The page, the result and the email are all
built from it.

## Files

| What | Where |
| --- | --- |
| Page | `app/intuition-blueprint/page.tsx` |
| Saved guide pages (from the email) | `app/intuition-blueprint/[authority]/page.tsx` |
| Server routes | `app/api/intuition-blueprint/{places,chart,guide}` |
| The guided flow | `components/intuition/IntuitionBlueprint.tsx` |
| Result layout (shared) | `components/intuition/AuthorityResult.tsx` |
| Birthplace search | `components/intuition/PlaceSearch.tsx` |
| Birth details validation | `lib/intuition/birthInput.ts` |
| Time zones | `lib/intuition/timezone.ts` |
| Planet positions | `lib/intuition/ephemeris.ts` |
| Bodygraph and authority | `lib/intuition/bodygraph.ts` |
| Orchestration | `lib/intuition/calculate.ts` |
| Guide email and delivery | `lib/intuition/guideEmail.ts`, `lib/intuition/delivery.ts` |
| Copy | `content/intuitionBlueprint.ts` |
| Apps Script | `docs/intuition-blueprint-apps-script.gs` |
| Tests | `lib/intuition/intuition.test.ts` (`npm test`) |
