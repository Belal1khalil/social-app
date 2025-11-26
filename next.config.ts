import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  //https://linked-posts.routemisr.com/uploads/d8f7523d-a69d-4734-9633-09e2f122c72f-poert1.png
  images: {
    remotePatterns: [{
      hostname:"linked-posts.routemisr.com",
      pathname: "/uploads/**"
    }],
  },
};

export default nextConfig;
