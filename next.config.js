/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      {hostname:"d3goi0sij13qcy.cloudfront.net"},
        
          ],
    },
    experimental:{
        serverActions:true,
    },
    env: {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    },
}

module.exports = nextConfig
