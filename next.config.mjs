/** @type {import('next').NextConfig} */

const BASE_URL = `https://admin.arimayi.io`;

const nextConfig = {
  // distDir: "./dist",
  output: 'standalone',
  env: {
    BASE_URL: `${BASE_URL}`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arimayi.io',
        pathname: '**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    removeUnknownsAndDefaults: false,
                    // cleanupIDs: false
                  }
                }
              }
            ]
          }
        }
      }],
    });
    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

};

export default nextConfig;