/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    env: {
        GAME_API_BASE_URL: process.env.GAME_API_BASE_URL,
    },
}

module.exports = nextConfig
