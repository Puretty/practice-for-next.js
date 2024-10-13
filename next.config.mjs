/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'prod' ? 'standalone' : undefined,
    
  webpackDevMiddleware: config => {
    if (process.env.NODE_ENV !== 'prod') {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
