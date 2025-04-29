import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
            },
            {
                hostname: "storage.googleapis.com",
            },
            {
                hostname: "i.pravatar.cc",
            },
        ],
    },
};

export default nextConfig;
