/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The project's vercel.app address serves the same site; send it to the
  // real domain so search engines only ever see one copy.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lenainthewild.vercel.app' }],
        destination: 'https://www.lenainthewild.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
};

module.exports = nextConfig;
