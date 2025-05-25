/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [ 'victorious-prize-eeb50f2b32.media.strapiapp.com' , 'victorious-prize-eeb50f2b32.strapiapp.com'],
  },
};
module.exports = {
  experimental: {
    modern: true,
  },
};

export default nextConfig;
