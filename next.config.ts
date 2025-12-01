import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  // Use assetPrefix to serve static assets from the blog domain directly
  // This avoids conflicts with the portfolio's /_next path
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ASSET_PREFIX : undefined,
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // adding this for portfolio/blog
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/',
      },
      {
        source: '/blog/:path*',
        destination: '/:path*',
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-mdx-code-props')],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
