/**
 * The Intuition Blueprint: guide delivery + sign-up sheet.
 *
 * Paste this into Extensions → Apps Script on a new Google Sheet called
 * "Intuition Blueprint Sign-ups", set SECRET below (the same value as
 * INTUITION_GUIDE_SCRIPT_SECRET in Vercel), then Deploy → New deployment →
 * Web app, Execute as: Me, Who has access: Anyone. Copy the …/exec URL into
 * INTUITION_GUIDE_SCRIPT_URL in Vercel. Full steps: docs/intuition-blueprint.md
 *
 * The website sends the finished email (subject, text and HTML). This script
 * only checks the secret, saves one row and sends the email from your Gmail.
 * Birth details are never sent here.
 */
const SECRET = 'PASTE-THE-SAME-LONG-RANDOM-SECRET-HERE';
const SENDER_NAME = 'Lena in the Wild';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data || data.secret !== SECRET) return reply({ ok: false, error: 'unauthorised' });

    const email = String(data.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return reply({ ok: false, error: 'invalid email' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Email', 'First name', 'Authority', 'Marketing emails', 'Consent wording shown']);
    }
    // Stop formulas being injected into the sheet through the name field
    const safe = (v) => String(v || '').replace(/^[=+\-@]/, "'$&").slice(0, 200);
    sheet.appendRow([
      new Date(),
      safe(email),
      safe(data.firstName),
      safe(data.authority),
      data.marketingConsent === true ? 'Yes' : 'No',
      safe(data.consentWording),
    ]);

    GmailApp.sendEmail(email, String(data.subject), String(data.text), {
      htmlBody: String(data.html),
      name: SENDER_NAME,
    });
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: 'failed' });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
