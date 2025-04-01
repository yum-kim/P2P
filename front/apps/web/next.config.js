//next.config.js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
    domains: [`${process.env.NEXT_PUBLIC_IMG_URL}`]
  }
}