//next.config.js
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
    domains: [`${process.env.NEXT_PUBLIC_IMG_URL}`],
  },
  webpack: (config) => {
    // 경로 alias 지정
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@p2p-ui/components': path.resolve(__dirname, '../ui/src/components'),
      '@p2p-ui/assets': path.resolve(__dirname, '../ui/src/assets'),
    };

    return config;
  },
};
