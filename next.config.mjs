/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        WEBSOCKET_PROTOCOL: process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL,
        BACKEND_PROTOCOL: process.env.NEXT_PUBLIC_BACKEND_PROTOCOL,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;

