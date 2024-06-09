/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        WEBSOCKET_PROTOCOL: process.env.WEBSOCKET_PROTOCOL,
        BACKEND_PROTOCOL: process.env.BACKEND_PROTOCOL,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;

