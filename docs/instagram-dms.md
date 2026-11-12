# Instagram comment-to-DM (replaces ManyChat)

Someone comments a keyword on a post or reel, and gets a DM with the link.
Free: runs on the site's own Vercel project, using Meta's Instagram API.

- **Keywords, DM wording, public reply:** `content/instagramDms.ts`
  (LEAP = free intuition quiz, UNSTUCK = free guided tapping practice).
- **Webhook:** `app/api/instagram/route.ts` (address: `https://www.lenainthewild.com/api/instagram`).
- **Logic and tests:** `lib/instagram/` (`npm test`).
- People get a link, then give their name and email on the existing forms, so
  sign-ups land in the same inbox and Google Sheets as before.

Instagram only allows **one DM per comment**, within 7 days of the comment.

## Setup (after the code is pushed and deployed)

The Meta app is **LITW**, which already has the "Manage messaging & content on
Instagram" use case. Meta's screens change, so names below may differ slightly.

1. In the LITW app, open **Use cases → Manage messaging & content on Instagram → Customize**.
2. Under the API setup, **add your Instagram account** (log in and allow access)
   and **generate an access token**. Copy it.
3. In Vercel → the project → **Settings → Environment Variables**, add (Production):
   - `INSTAGRAM_ACCESS_TOKEN` = the token from step 2
   - `INSTAGRAM_APP_SECRET` = Meta app **Settings → Basic → App secret**
   - `INSTAGRAM_VERIFY_TOKEN` = any long random phrase you make up
4. Redeploy so Vercel picks them up.
5. Back in the app's webhook settings, set **Callback URL** to
   `https://www.lenainthewild.com/api/instagram` and **Verify token** to the
   phrase from step 3. Save. Then **subscribe to the `comments` field**.
6. Test by commenting LEAP on one of your own posts from a different account.

Access tokens from Meta can expire (often after ~60 days). If DMs stop, make a
new token and update `INSTAGRAM_ACCESS_TOKEN`.

## Going live

While the app is in development mode, Meta may only deliver comments and DMs
for people who have a role on the app (you and any testers). For everyone to
get DMs, the app needs Meta's **App Review** for the comments and messages
permissions, then **Publish** the app. This is the slow step (usually days).
Exact requirements are confirmed on Meta's screens during review.

Nothing here replies unless all three env vars are set; without them the
webhook returns "Not set up" and does nothing.
