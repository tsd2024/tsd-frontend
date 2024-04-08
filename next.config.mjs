/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        WEBSOCKET_PROTOCOL: process.env.WEBSOCKET_PROTOCOL,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;

