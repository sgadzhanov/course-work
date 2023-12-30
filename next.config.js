/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,  
  images: {
    domains: ['res.cloudinary.com'],
  },
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
}

module.exports = nextConfig
