/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    {
      source: "/octokit/:path*",
      destination: "https://api.github.com/:path*",
    },
  ],
};

module.exports = nextConfig;
