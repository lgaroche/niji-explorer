import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "storage-emea-west-pdc-z01.cloud.ubisoft.com",
      "ipfs.aleph.im",
      "ipfs.bytes32.net",
    ],
  },
}

export default nextConfig
