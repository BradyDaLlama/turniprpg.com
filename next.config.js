/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/invite',
                destination:
                    'https://discord.com/oauth2/authorize?client_id=882808942881816577&permissions=2147797056&scope=bot',
                permanent: true,
            },
            {
                source: '/support',
                destination: 'https://discord.gg/cGEEHXw',
                permanent: true,
            },
            {
                source: '/vote',
                destination: 'https://top.gg/bot/882808942881816577/vote',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [];
    },
};
