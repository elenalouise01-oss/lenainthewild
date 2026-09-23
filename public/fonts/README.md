# Custom fonts

Playfair Display, Montserrat and Gochi Hand load automatically from Google Fonts —
nothing to do there.

Giaza (logo), AC Fifindrel and Biro Script are licensed fonts and are **not**
bundled with this repo. Drop your licensed font files into this folder using
these exact names and they'll pick up automatically (declared in
`app/globals.css`):

| Font | Expected file(s) |
| --- | --- |
| Giaza (logo wordmark) | `giaza.woff2` |
| AC Fifindrel (display accent) | `ac-fifindrel.woff2` |
| Biro Script (handwritten accent) | `biro-script.woff2` |

Until those files are added, the site gracefully falls back to Playfair
Display / Gochi Hand so nothing breaks — it will just look slightly
different from final until the real files are in place.
