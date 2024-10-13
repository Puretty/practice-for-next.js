/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};

if (process.env.NODE_ENV !== 'production') {
  nextConfig.webpackDevMiddleware = config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  };
}

export default nextConfig;
