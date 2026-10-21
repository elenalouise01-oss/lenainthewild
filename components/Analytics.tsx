import Script from 'next/script';

// Google Analytics 4. The Measurement ID is public (it ships in every page),
// so it lives here; NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel overrides it.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-T9DN97LKN4';

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
