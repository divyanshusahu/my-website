/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // This disables the experimental features that cause the fetchPriority warning
    disableStaticImages: false,
    // Using proper image formats
    formats: ['image/webp'],
  },
}

module.exports = nextConfig